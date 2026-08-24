"use client";

import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import React, { useRef } from "react";

export interface TextRevealProps {
  children: React.ReactNode;
  as?: keyof React.JSX.IntrinsicElements;
  type?: "lines" | "words" | "chars";
  scroll?: boolean | "scrub";
  scrubSmoothness?: number | boolean;
  triggerRef?: React.RefObject<HTMLElement | null>;
  start?: string;
  end?: string;
  stagger?: number;
  initialOpacity?: number;
  className?: string;
}

export default function TextRevealOpacity({
  children,
  as = "p",
  type = "words",
  scroll = true,
  scrubSmoothness = 0.5,
  triggerRef,
  start = "top 70%",
  end = "center 40%",
  stagger = 0.03,
  initialOpacity = 0.15,
  className = "",
}: TextRevealProps) {
  const textRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      if (!textRef.current) return;

      const split = new SplitText(textRef.current, {
        type: type === "lines" ? "lines" : type === "chars" ? "chars, words" : "words",
        linesClass: "line",
        wordsClass: "word",
        charsClass: "char",
      });

      const targets = split[type];

      gsap.set(targets, {
        opacity: initialOpacity,
        willChange: "opacity",
      });

      if (scroll === "scrub") {
        gsap.to(targets, {
          opacity: 1,
          stagger,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: triggerRef?.current || textRef.current,
            start,
            end,
            scrub: scrubSmoothness,
            fastScrollEnd: true,
          },
        });
      } else if (scroll) {
        gsap.to(targets, {
          opacity: 1,
          stagger,
          duration: 0.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      }
    },
    { scope: textRef, dependencies: [type, scroll, scrubSmoothness, start, end, stagger] }
  );

  return React.createElement(
    as,
    {
      ref: textRef,
      className,
    },
    children
  );
}