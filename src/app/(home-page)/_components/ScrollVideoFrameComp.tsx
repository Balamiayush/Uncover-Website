"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollVideoFrameComp() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useGSAP(
    () => {
      // 1. Setup Canvas & Context
      const canvas = canvasRef.current;
      if (!canvas) return;

      const context = canvas.getContext("2d");
      if (!context) return;

      const frameCount = 121;
      const currentFrame = (index: number) =>
        `/images/scroll-anim-imgs/frame_${(index + 1).toString().padStart(3, "0")}_inspyrenet.webp`;

      const images: HTMLImageElement[] = [];
      const sequence = { frame: 0 };

      // Render function to draw image frame on canvas
      const render = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        const img = images[sequence.frame];
        if (img && img.complete) {
          context.drawImage(img, 0, 0);
        }
      };

      // 2. Preload Images
      let loadedCount = 0;
      for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        img.onload = () => {
          loadedCount++;
          if (loadedCount === 1) {
            canvas.width = img.width;
            canvas.height = img.height;
            render();
          }
        };
        images.push(img);
      }

      // 3. Timeline with Frame Scrub + Opacity Fade Out
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "+=410%",
          scrub: 1,
        },
      });

      // Scrub frames from index 0 to frameCount - 1
      tl.to(
        sequence,
        {
          frame: frameCount - 1,
          snap: "frame",
          ease: "none",
          duration: 1,
          onUpdate: render,
        },
        0
      );

      // Fade out canvas CSS opacity at the end of the scroll (e.g., final 20% of scroll)
      tl.to(
        canvas,
        {
          opacity: 0,
          ease: "power1.out",
          duration: 0.2,
        },
        0.8 // Starts when 80% of the timeline is reached
      );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="w-full h-full fixed z-1000 top-0 pointer-events-none">
      <section className="canvas-section fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[40%] lg:h-[25vw] lg:w-[25vw]">
        <canvas ref={canvasRef} className="h-full w-full object-cover" />
      </section>
    </div>
  );
}