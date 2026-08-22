"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  useRef,
  useMemo,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";
import * as THREE from "three";

// ============================================
// SHADERS (unchanged fluid sim, generic content sampler)
// ============================================

const quadVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fluidUpdateShader = `
  uniform sampler2D uPrevState;
  uniform sampler2D uCurrentState;
  uniform vec2 uResolution;
  uniform float uViscosity;
  uniform float uDecay;

  uniform vec2 uMouse;
  uniform vec2 uPrevMouse;
  uniform float uRadius;
  uniform float uIntensity;
  uniform float uMouseVelocity;
  uniform float uActive;

  varying vec2 vUv;

  void main() {
    vec2 texel = 1.0 / uResolution;

    float current = texture2D(uCurrentState, vUv).r;
    float prev = texture2D(uPrevState, vUv).r;

    float left = texture2D(uCurrentState, vUv + vec2(-texel.x, 0.0)).r;
    float right = texture2D(uCurrentState, vUv + vec2(texel.x, 0.0)).r;
    float top = texture2D(uCurrentState, vUv + vec2(0.0, texel.y)).r;
    float bottom = texture2D(uCurrentState, vUv + vec2(0.0, -texel.y)).r;

    float neighbors = (left + right + top + bottom) * 0.25;
    float wave = neighbors * 2.0 - prev;
    wave = mix(current, wave, uViscosity);
    wave *= uDecay;

    if (uActive > 0.5 && uMouseVelocity > 0.0001) {
      vec2 mousePos = uMouse;
      float dist = distance(vUv, mousePos);

      float ripple = smoothstep(uRadius, 0.0, dist);
      ripple = pow(ripple, 2.0);

      vec2 prevMousePos = uPrevMouse;
      for (float i = 0.0; i < 8.0; i++) {
        float t = i / 8.0;
        vec2 trailPos = mix(prevMousePos, mousePos, t);
        float d = distance(vUv, trailPos);
        float trailRipple = smoothstep(uRadius * 0.7, 0.0, d);
        ripple = max(ripple, pow(trailRipple, 2.0));
      }

      float finalRipple = ripple * uIntensity * min(uMouseVelocity * 10.0, 1.0);
      wave += finalRipple;
    }

    gl_FragColor = vec4(wave, wave, wave, 1.0);
  }
`;

const contentVertexShader = `
  varying vec2 vUv;
  varying vec2 vScreenUv;
  uniform vec2 uViewportSize;

  void main() {
    vUv = uv;
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vScreenUv = (worldPos.xy + uViewportSize * 0.5) / uViewportSize;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Generic sampler — works whether uTexture came from a <video>, an <img>,
// or a canvas snapshot of arbitrary DOM/text.
const contentFragmentShader = `
  uniform sampler2D uTexture;
  uniform sampler2D uDisplacement;
  uniform float uDistortionStrength;
  uniform float uAberration;
  uniform float uLightIntensity;
  uniform float uSpecularPower;
  uniform vec2 uResolution;
  uniform float uContentAspect;
  uniform float uPlaneAspect;

  varying vec2 vUv;
  varying vec2 vScreenUv;

  vec2 coverUv(vec2 uv, float contentAspect, float planeAspect) {
    vec2 ratio = vec2(
      min(planeAspect / contentAspect, 1.0),
      min(contentAspect / planeAspect, 1.0)
    );
    return vec2(
      uv.x * ratio.x + (1.0 - ratio.x) * 0.5,
      uv.y * ratio.y + (1.0 - ratio.y) * 0.5
    );
  }

  vec3 calculateNormal(vec2 uv, float strength) {
    vec2 texel = 1.0 / uResolution;
    float left = texture2D(uDisplacement, uv + vec2(-texel.x, 0.0)).r;
    float right = texture2D(uDisplacement, uv + vec2(texel.x, 0.0)).r;
    float top = texture2D(uDisplacement, uv + vec2(0.0, texel.y)).r;
    float bottom = texture2D(uDisplacement, uv + vec2(0.0, -texel.y)).r;

    vec3 normal;
    normal.x = (left - right) * strength;
    normal.y = (bottom - top) * strength;
    normal.z = 1.0;
    return normalize(normal);
  }

  void main() {
    vec2 coveredUv = coverUv(vUv, uContentAspect, uPlaneAspect);
    vec3 normal = calculateNormal(vScreenUv, 50.0);
    float normalDeviation = length(normal.xy);

    vec2 refraction = normal.xy * uDistortionStrength;
    vec2 distortedUv = coveredUv + refraction;
    distortedUv = clamp(distortedUv, 0.001, 0.999);

    float aberrationAmount = uAberration * (abs(normal.x) + abs(normal.y));
    vec4 colorR = texture2D(uTexture, distortedUv + vec2(aberrationAmount, 0.0));
    vec4 colorG = texture2D(uTexture, distortedUv);
    vec4 colorB = texture2D(uTexture, distortedUv - vec2(aberrationAmount, 0.0));
    vec3 color = vec3(colorR.r, colorG.g, colorB.b);
    float alpha = colorG.a;

    float rippleMask = smoothstep(0.01, 0.1, normalDeviation);

    vec3 lightDir = normalize(vec3(0.0, 0.0, 0.0));
    vec3 viewDir = vec3(0.0, 0.0, 1.0);
    vec3 halfDir = normalize(lightDir + viewDir);

    float specular = pow(max(dot(normal, halfDir), 0.0), uSpecularPower);
    specular *= uLightIntensity * rippleMask;
    color += vec3(specular);

    float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 0.0);
    color += vec3(fresnel * uLightIntensity * 0.0* rippleMask);

    gl_FragColor = vec4(color, alpha);
  }
`;

export interface EffectSettings {
  intensity: number;
  scale: number;
  viscosity: number;
  decay: number;
  distortionStrength: number;
  aberration: number;
  lightIntensity: number;
  specularPower: number;
}

// ============================================
// CONTENT SOURCE DETECTION
// A "source" is anything that can back a THREE.Texture:
// a live <video>, a loaded <img>, or a <canvas> snapshot of arbitrary DOM.
// ============================================

type ResolvedSource = {
  texture: THREE.Texture;
  aspect: number;
  isVideo: boolean;
  needsManualUpdate: boolean;
};

function useContentTexture(
  containerRef: React.RefObject<HTMLDivElement | null>,
) {
  const [resolved, setResolved] = useState<ResolvedSource | null>(null);
  const textureRef = useRef<THREE.Texture | null>(null);
  const rafRef = useRef<number | null>(null);

  const disposeCurrent = useCallback(() => {
    if (textureRef.current) {
      textureRef.current.dispose();
      textureRef.current = null;
    }
  }, []);

  const captureDomSnapshot = useCallback(
    async (el: HTMLElement) => {
      // Arbitrary DOM / text content: snapshot into a canvas.
      // Requires html2canvas (npm install html2canvas). Falls back to a
      // plain filled canvas with no visual if it's unavailable.
      try {
        const html2canvas = (await import("html2canvas")).default;
        const canvas = await html2canvas(el, {
          backgroundColor: null,
          scale: Math.min(window.devicePixelRatio || 1, 2),
          logging: false,
        });
        const texture = new THREE.CanvasTexture(canvas);
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        // texture.colorSpace = THREE.SRGBColorSpace;
        disposeCurrent();
        textureRef.current = texture;
        setResolved({
          texture,
          aspect: canvas.width / canvas.height || 1,
          isVideo: false,
          needsManualUpdate: false,
        });
      } catch (err) {
        console.warn(
          "[WaterDistortionWrapper] html2canvas not available — install it to distort text/arbitrary DOM content.",
          err,
        );
      }
    },
    [disposeCurrent],
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;
    let resizeObserver: ResizeObserver | null = null;
    let mutationObserver: MutationObserver | null = null;
    let debounceTimer: ReturnType<typeof setTimeout> | null = null;

    const setup = () => {
      const videoEl = container.querySelector(
        "video",
      ) as HTMLVideoElement | null;
      const imgEl = container.querySelector("img") as HTMLImageElement | null;

      if (videoEl) {
        const texture = new THREE.VideoTexture(videoEl);
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        // texture.colorSpace = THREE.SRGBColorSpace;
        disposeCurrent();
        textureRef.current = texture;

        const updateAspect = () => {
          if (cancelled) return;
          const aspect =
            videoEl.videoWidth && videoEl.videoHeight
              ? videoEl.videoWidth / videoEl.videoHeight
              : 16 / 9;
          setResolved({
            texture,
            aspect,
            isVideo: true,
            needsManualUpdate: false,
          });
        };

        if (videoEl.readyState >= 1) updateAspect();
        videoEl.addEventListener("loadedmetadata", updateAspect);
        return () =>
          videoEl.removeEventListener("loadedmetadata", updateAspect);
      }

      if (imgEl) {
        const buildTexture = () => {
          if (cancelled) return;
          const texture = new THREE.Texture(imgEl);
          texture.needsUpdate = true;
          texture.minFilter = THREE.LinearFilter;
          texture.magFilter = THREE.LinearFilter;
          // texture.colorSpace = THREE.SRGBColorSpace;
          disposeCurrent();
          textureRef.current = texture;
          const aspect = imgEl.naturalWidth / imgEl.naturalHeight || 1;
          setResolved({
            texture,
            aspect,
            isVideo: false,
            needsManualUpdate: false,
          });
        };

        if (imgEl.complete && imgEl.naturalWidth) {
          buildTexture();
        } else {
          imgEl.addEventListener("load", buildTexture);
          return () => imgEl.removeEventListener("load", buildTexture);
        }
        return;
      }

      // Fallback: arbitrary DOM / text content
      captureDomSnapshot(container);

      const scheduleRecapture = () => {
        if (debounceTimer) clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => captureDomSnapshot(container), 150);
      };

      resizeObserver = new ResizeObserver(scheduleRecapture);
      resizeObserver.observe(container);

      mutationObserver = new MutationObserver(scheduleRecapture);
      mutationObserver.observe(container, {
        childList: true,
        characterData: true,
        subtree: true,
      });
    };

    const cleanupFn = setup();

    return () => {
      cancelled = true;
      if (typeof cleanupFn === "function") cleanupFn();
      resizeObserver?.disconnect();
      mutationObserver?.disconnect();
      if (debounceTimer) clearTimeout(debounceTimer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      disposeCurrent();
    };
  }, [containerRef, captureDomSnapshot, disposeCurrent]);

  return resolved;
}

// ============================================
// RIPPLE EFFECT (fluid sim — unchanged logic)
// ============================================

interface RippleEffectProps {
  source: ResolvedSource;
  settings: EffectSettings;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

function RippleEffect({ source, settings, containerRef }: RippleEffectProps) {
  const { gl, viewport } = useThree();
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const prevMouseRef = useRef({ x: 0.5, y: 0.5 });
  const mouseVelocityRef = useRef(0);
  const isActiveRef = useRef(0);

  const RESOLUTION = 512;

  const renderTargets = useMemo(() => {
    const options = {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      type: THREE.FloatType,
    };
    return [
      new THREE.WebGLRenderTarget(RESOLUTION, RESOLUTION, options),
      new THREE.WebGLRenderTarget(RESOLUTION, RESOLUTION, options),
      new THREE.WebGLRenderTarget(RESOLUTION, RESOLUTION, options),
    ];
  }, []);

  const pingPongRef = useRef(0);
  const quadGeometry = useMemo(() => new THREE.PlaneGeometry(2, 2), []);
  const offscreenScene = useMemo(() => new THREE.Scene(), []);
  const offscreenCamera = useMemo(
    () => new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1),
    [],
  );

  const fluidUpdateMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: quadVertexShader,
      fragmentShader: fluidUpdateShader,
      uniforms: {
        uPrevState: { value: null },
        uCurrentState: { value: null },
        uResolution: { value: new THREE.Vector2(RESOLUTION, RESOLUTION) },
        uViscosity: { value: settings.viscosity },
        uDecay: { value: settings.decay },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uPrevMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uRadius: { value: settings.scale },
        uIntensity: { value: settings.intensity },
        uMouseVelocity: { value: 0 },
        uActive: { value: 0 },
      },
    });
  }, []);

  const quadMeshRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    renderTargets.forEach((rt) => {
      gl.setRenderTarget(rt);
      gl.clear();
    });
    gl.setRenderTarget(null);
  }, [gl, renderTargets]);

  useEffect(() => {
    const mesh = new THREE.Mesh(quadGeometry, fluidUpdateMaterial);
    quadMeshRef.current = mesh;
    offscreenScene.add(mesh);
    return () => {
      offscreenScene.remove(mesh);
    };
  }, [quadGeometry, fluidUpdateMaterial, offscreenScene]);

  const contentMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: contentVertexShader,
      fragmentShader: contentFragmentShader,
      transparent: true,
      uniforms: {
        uTexture: { value: source.texture },
        uDisplacement: { value: renderTargets[0].texture },
        uViewportSize: {
          value: new THREE.Vector2(viewport.width, viewport.height),
        },
        uDistortionStrength: { value: settings.distortionStrength },
        uAberration: { value: settings.aberration },
        uLightIntensity: { value: settings.lightIntensity },
        uSpecularPower: { value: settings.specularPower },
        uResolution: { value: new THREE.Vector2(RESOLUTION, RESOLUTION) },
        uContentAspect: { value: source.aspect },
        uPlaneAspect: { value: viewport.width / viewport.height },
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Swap in new texture/aspect whenever the resolved source changes
  // (e.g. html2canvas re-snapshot, image swap) without rebuilding the material.
  useEffect(() => {
    contentMaterial.uniforms.uTexture.value = source.texture;
    contentMaterial.uniforms.uContentAspect.value = source.aspect;
    contentMaterial.needsUpdate = true;
  }, [source.texture, source.aspect, contentMaterial]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const localX = (e.clientX - rect.left) / rect.width;
      const localY = 1.0 - (e.clientY - rect.top) / rect.height;
      mouseRef.current.x = localX;
      mouseRef.current.y = localY;
      isActiveRef.current = 1;
    };

    const handleMouseEnter = () => {
      isActiveRef.current = 1;
    };

    const handleMouseLeave = () => {
      isActiveRef.current = 0;
      mouseVelocityRef.current = 0;
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [containerRef]);

  useFrame(() => {
    if (!quadMeshRef.current) return;

    // Live-updating sources (video) need this every frame; static ones
    // (image / canvas snapshot) only need it once, but flagging is cheap.
    if (source.isVideo) {
      contentMaterial.uniforms.uTexture.value.needsUpdate = true;
    }

    const dx = mouseRef.current.x - prevMouseRef.current.x;
    const dy = mouseRef.current.y - prevMouseRef.current.y;
    const velocity = Math.sqrt(dx * dx + dy * dy);
    mouseVelocityRef.current = isActiveRef.current ? velocity : 0;

    fluidUpdateMaterial.uniforms.uViscosity.value = settings.viscosity;
    fluidUpdateMaterial.uniforms.uDecay.value = settings.decay;
    fluidUpdateMaterial.uniforms.uRadius.value = settings.scale;
    fluidUpdateMaterial.uniforms.uIntensity.value = settings.intensity;
    fluidUpdateMaterial.uniforms.uMouse.value.set(
      mouseRef.current.x,
      mouseRef.current.y,
    );
    fluidUpdateMaterial.uniforms.uPrevMouse.value.set(
      prevMouseRef.current.x,
      prevMouseRef.current.y,
    );
    fluidUpdateMaterial.uniforms.uMouseVelocity.value =
      mouseVelocityRef.current;
    fluidUpdateMaterial.uniforms.uActive.value = isActiveRef.current;

    const current = pingPongRef.current;
    const prev = (current + 2) % 3;
    const next = (current + 1) % 3;

    fluidUpdateMaterial.uniforms.uPrevState.value = renderTargets[prev].texture;
    fluidUpdateMaterial.uniforms.uCurrentState.value =
      renderTargets[current].texture;

    gl.setRenderTarget(renderTargets[next]);
    gl.render(offscreenScene, offscreenCamera);
    gl.setRenderTarget(null);

    contentMaterial.uniforms.uDisplacement.value = renderTargets[next].texture;
    contentMaterial.uniforms.uViewportSize.value.set(
      viewport.width,
      viewport.height,
    );
    contentMaterial.uniforms.uDistortionStrength.value =
      settings.distortionStrength;
    contentMaterial.uniforms.uAberration.value = settings.aberration;
    contentMaterial.uniforms.uLightIntensity.value = settings.lightIntensity;
    contentMaterial.uniforms.uSpecularPower.value = settings.specularPower;
    contentMaterial.uniforms.uPlaneAspect.value =
      viewport.width / viewport.height;

    pingPongRef.current = next;
    prevMouseRef.current.x = mouseRef.current.x;
    prevMouseRef.current.y = mouseRef.current.y;
  });

  useEffect(() => {
    return () => {
      renderTargets.forEach((rt) => rt.dispose());
      quadGeometry.dispose();
      fluidUpdateMaterial.dispose();
      contentMaterial.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <mesh position={[0, 0, 0]}>
      <planeGeometry args={[viewport.width, viewport.height, 1, 1]} />
      <primitive object={contentMaterial} attach="material" />
    </mesh>
  );
}

// ============================================
// PUBLIC WRAPPER — wrap literally anything
// ============================================

interface WaterDistortionWrapperProps {
  children: ReactNode;
  settings: EffectSettings;
  className?: string;
}

export function WaterDistortionWrapper({
  children,
  settings,
  className = "",
}: WaterDistortionWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const source = useContentTexture(containerRef);

  return (
    <div ref={containerRef} className={`relative w-full h-full ${className}`}>
      {/* Real content stays mounted for layout/SEO/a11y, but invisible —
          the canvas below renders the distorted version on top. */}
      <div className="absolute inset-0 opacity-0 pointer-events-none">
        {children}
      </div>

      {source && (
        <Canvas
          className="absolute inset-0"
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          camera={{ position: [0, 0, 5], fov: 50, near: 0.1, far: 100 }}
          dpr={[1, 2]}
          style={{ width: "100%", height: "100%", display: "block" }}
        >
          <RippleEffect
            source={source}
            settings={settings}
            containerRef={containerRef}
          />
        </Canvas>
      )}
    </div>
  );
}
