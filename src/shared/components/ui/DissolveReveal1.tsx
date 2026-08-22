"use client";

import React, { useRef, useMemo, useLayoutEffect, useEffect } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GUI from "lil-gui";

gsap.registerPlugin(ScrollTrigger);

interface RGB {
  r: number;
  g: number;
  b: number;
}

interface GuiConfig {
  progress: number;
  progressIn: number;
  progressOut: number;
  spread: number;
  edgeWidth: number;
  direction: number;
  noiseScale: number;
  turbulenceSpeed: number;
  idleTurbulence: boolean;
  hasFill: boolean;
  fillColor: string;
  edgeColor: string;
  edgeIntensity: number;
  number: number;

  replay: () => void;
}

interface DissolveUniforms {
  uProgress: { value: number };
  uProgressIn:{value:number};
  uProgressOut:{value:number};
  uResolution: { value: THREE.Vector2 };
  uColor: { value: THREE.Vector3 };
  uEdgeColor: { value: THREE.Vector3 };
  uSpread: { value: number };
  uEdgeWidth: { value: number };
  uNoiseScale: { value: number };
  uDirection: { value: number };
  uTime: { value: number };
  uTurbulenceSpeed: { value: number };
  uIdleTurbulence: { value: number };
  uEdgeIntensity: { value: number };
  uHasFill: { value: number };
  unumber: { value: number };
  [uniform: string]: THREE.IUniform;
}

interface DissolvePlaneProps {
  scrollTriggerRef: React.RefObject<HTMLDivElement | null>;
  triggerSelector?: string;
}

interface DissolveRevealProps {
  children: React.ReactNode;
  triggerSelector?: string;
}

// --------------------------------------------------
// SHADERS
// --------------------------------------------------
export const vertexShader: string = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

export const fragmentShader: string = `
  uniform float uProgress;
  uniform float uProgressIn;
  uniform float uProgressOut;
  uniform vec2 uResolution;
  uniform vec3 uColor;
  uniform vec3 uEdgeColor;
  uniform float uSpread;
  uniform float uEdgeWidth;
  uniform float uNoiseScale;
  uniform float uDirection;
  uniform float uTime;
  uniform float uTurbulenceSpeed;
  uniform float uIdleTurbulence;
  uniform float uEdgeIntensity;
  uniform float uHasFill;
  uniform float unumber;

  varying vec2 vUv;

  float Hash(vec2 p) {
    vec3 p2 = vec3(p.xy, 1.0);
    return fract(sin(dot(p2, vec3(37.1, 61.7, 12.4))) * 3758.5453123);
  }

  float noise(in vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(Hash(i + vec2(0.0, 0.0)), Hash(i + vec2(1.0, 0.0)), f.x),
      mix(Hash(i + vec2(0.0, 1.0)), Hash(i + vec2(1.0, 1.0)), f.x),
      f.y
    );
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += noise(p) * a;
      p *= 2.0;
      a *= 0.5;
    }
    return v;
  }

  vec2 rotate(vec2 p, float angleDeg) {
    float a = radians(angleDeg);
    float s = sin(a);
    float c = cos(a);
    return mat2(c, -s, s, c) * p;
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / uResolution.y;
    vec2 centeredUv = (uv - 0.5) * vec2(aspect, 1.0);

    vec2 dirUv = rotate(centeredUv, uDirection) + 0.5;
    vec2 timeOffset = vec2(uTime * uTurbulenceSpeed * uIdleTurbulence);

    // BOTTOM-TO-TOP REVEAL logic:
    // At uProgress = 0: Screen is fully covered in solid fill color
    // At uProgress = 1: Dissolve wave sweeps upward from bottom to top
    float dissolveEdge = dirUv.y - (uProgress * 1.6) + 0.3;
    float prg =  uProgress;
    float y =unumber - (abs(uv.y-prg)*2.);
    float yIn = (1.-uv.y)-(1.-uProgressIn);
    float yOut = (uv.y)-(1.-uProgressOut);
    float yDiff = max(yIn,yOut);
    
    
    float noiseValue = fbm(centeredUv * uNoiseScale + timeOffset);
    
    float d = yDiff + noiseValue * uSpread;

    
    float pixelSize = (1.0 / uResolution.y) * max(uEdgeWidth, 0.001) * 4.0;
    float alpha = smoothstep(-pixelSize, pixelSize, d);

    float edgeBand = 1.0 - smoothstep(0.0, pixelSize * 3.0, abs(d));
    vec3 color = mix(uColor, uEdgeColor, edgeBand * uEdgeIntensity);

    float finalAlpha = mix(edgeBand * uEdgeIntensity, alpha, uHasFill);
 
    
    gl_FragColor = vec4(color, finalAlpha);
    // gl_FragColor = vec4(y,y,y,1.);
    }
`;

function hexToRgb(hex: string): RGB {
  const cleanHex = hex.replace("#", "");
  const num = parseInt(cleanHex, 16);
  return {
    r: ((num >> 16) & 255) / 255,
    g: ((num >> 8) & 255) / 255,
    b: (num & 255) / 255,
  };
}

// --------------------------------------------------
// R3F DISSOLVE PLANE COMPONENT
// --------------------------------------------------
function DissolvePlane({ scrollTriggerRef }: DissolvePlaneProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { size } = useThree();
  const clockRef = useRef(0);

  const guiConfig = useRef<GuiConfig>({
    progress: 0,
    progressIn: 0,
    progressOut: 0,
    spread: 0.5,
    edgeWidth: 1,
    direction: 180,
    number: 0,
    noiseScale: 15,
    turbulenceSpeed: 0.05,
    idleTurbulence: true,
    hasFill: true,
    fillColor: "#550b18",
    edgeColor: "#ff8a5c",
    edgeIntensity: 0.6,
    replay: () => {
      if (!materialRef.current) return;
      gsap.fromTo(
        materialRef.current.uniforms.uProgress,
        { value: 0 },
        { value: 1, duration: 2.2, ease: "power1.inOut" },
      );
    },
  });

  const initialFill = useMemo(() => hexToRgb(guiConfig.current.fillColor), []);
  const initialEdge = useMemo(() => hexToRgb(guiConfig.current.edgeColor), []);

  const uniforms = useMemo<DissolveUniforms>(
    () => ({
      uProgress: { value: 0 },
      uProgressIn:{value:0},
      uProgressOut:{value:0},
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uColor: {
        value: new THREE.Vector3(initialFill.r, initialFill.g, initialFill.b),
      },
      uEdgeColor: {
        value: new THREE.Vector3(initialEdge.r, initialEdge.g, initialEdge.b),
      },
      uSpread: { value: guiConfig.current.spread },
      uEdgeWidth: { value: guiConfig.current.edgeWidth },
      uNoiseScale: { value: guiConfig.current.noiseScale },
      uDirection: { value: guiConfig.current.direction },
      uTime: { value: 0 },
      uTurbulenceSpeed: { value: guiConfig.current.turbulenceSpeed },
      uIdleTurbulence: { value: guiConfig.current.idleTurbulence ? 1 : 0 },
      uEdgeIntensity: { value: guiConfig.current.edgeIntensity },
      uHasFill: { value: guiConfig.current.hasFill ? 1 : 0 },
      unumber: { value: guiConfig.current.number },
    }),
    [],
  );

  useFrame((_, delta) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uResolution.value.set(size.width, size.height);
    clockRef.current += delta;
    materialRef.current.uniforms.uTime.value = clockRef.current;
  });

  useLayoutEffect(() => {
    if (!scrollTriggerRef.current || !materialRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(materialRef.current!.uniforms.uProgress, {
        value: 1,
        ease: "none",
        scrollTrigger: {
          trigger: scrollTriggerRef.current,
          start: "top 100%",
          end: "bottom 100%",
          markers: true,
          scrub: 0.5,
          onUpdate: (self) => {
            guiConfig.current.progress = 1 - self.progress;
          },
        },
      });
    });

    return () => ctx.revert();
  }, [scrollTriggerRef]);

  useEffect(() => {
    const gui = new GUI({ title: "GLSL Dissolve Controls" });
    gui.domElement.style.zIndex = "50";

    const mat = () => materialRef.current;

    const dissolveFolder = gui.addFolder("Dissolve");
    dissolveFolder
      .add(guiConfig.current, "progress", 0, 1, 0.001)
      .name("Progress")
      .listen()
      .onChange((v: number) => mat() && (mat()!.uniforms.uProgress.value = v));
    dissolveFolder
      .add(guiConfig.current, "progressIn", 0, 1, 0.001)
      .name("Progress In")
      .listen()
      .onChange((v: number) => mat() && (mat()!.uniforms.uProgressIn.value = v));
    dissolveFolder
      .add(guiConfig.current, "progressOut", 0, 1, 0.001)
      .name("Progress Out")
      .listen()
      .onChange((v: number) => mat() && (mat()!.uniforms.uProgressOut.value = v));
    dissolveFolder
      .add(guiConfig.current, "spread", 0, 2, 0.01)
      .name("Noise Spread")
      .onChange((v: number) => mat() && (mat()!.uniforms.uSpread.value = v));
    dissolveFolder
      .add(guiConfig.current, "edgeWidth", 0.1, 5, 0.01)
      .name("Edge Softness")
      .onChange((v: number) => mat() && (mat()!.uniforms.uEdgeWidth.value = v));
    dissolveFolder
      .add(guiConfig.current, "direction", -180, 180, 1)
      .name("Direction (deg)")
      .onChange((v: number) => mat() && (mat()!.uniforms.uDirection.value = v));
    dissolveFolder.add(guiConfig.current, "replay").name("▶ Replay Dissolve");

    dissolveFolder
      .add(guiConfig.current, "number", 0, 10, 0.1)
      .name("Number")
      .onChange((v: number) => mat() && (mat()!.uniforms.unumber.value = v));

    const colorFolder = gui.addFolder("Colors");
    colorFolder
      .add(guiConfig.current, "hasFill")
      .name("Enable Fill")
      .onChange(
        (v: boolean) => mat() && (mat()!.uniforms.uHasFill.value = v ? 1 : 0),
      );
    colorFolder
      .addColor(guiConfig.current, "fillColor")
      .name("Fill Color")
      .onChange((v: string) => {
        const rgb = hexToRgb(v);
        mat() && mat()!.uniforms.uColor.value.set(rgb.r, rgb.g, rgb.b);
      });
    colorFolder
      .addColor(guiConfig.current, "edgeColor")
      .name("Edge Glow Color")
      .onChange((v: string) => {
        const rgb = hexToRgb(v);
        mat() && mat()!.uniforms.uEdgeColor.value.set(rgb.r, rgb.g, rgb.b);
      });

    return () => gui.destroy();
  }, []);

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthTest={false}
      />
    </mesh>
  );
}

// --------------------------------------------------
// WRAPPER COMPONENT
// --------------------------------------------------
export default function DissolveReveal1({}: DissolveRevealProps) {
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={scrollWrapperRef}
      className="w-full h-screen absolute bottom-0 translate-y-1/2 "
    >
      <div className="w-full h-full absolute inset-0 z-[10] pointer-events-none">
        <Canvas
          className="w-full h-full"
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          camera={{ position: [0, 0, 1] }}
          dpr={[1, 2]}
        >
          <DissolvePlane scrollTriggerRef={scrollWrapperRef} />
        </Canvas>
      </div>
    </div>
  );
}
