"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText, ScrollTrigger);

interface CopyProps {
  children: React.ReactNode;
  animateOnScroll?: boolean;
  delay?: number;
  style?: string;
}

export default function TextReveal({
  children,
  animateOnScroll = true,
  delay = 0,
}: CopyProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const elementRefs = useRef<HTMLElement[]>([]);
  const splitRefs = useRef<SplitText[]>([]);
  const lines = useRef<HTMLElement[]>([]);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const runSplitAnimation = async () => {
        try {
          await document.fonts.ready;
        } catch (error) {
          console.error("Error waiting for fonts to load:", error);
        }

        splitRefs.current = [];
        lines.current = [];
        elementRefs.current = [];

        let elements: HTMLElement[] = [];
        if (container.hasAttribute("data-copy-wrapper")) {
          elements = Array.from(container.children) as HTMLElement[];
        } else {
          elements = [container];
        }

        elements.forEach((element) => {
          elementRefs.current.push(element);

          const split = new SplitText(element, {
            type: "lines",
            mask: "lines",
            linesClass: "line++",
            lineThreshold: 0.1,
          });

          const splitLines = split.lines as HTMLElement[];

          splitLines.forEach((line) => {
            line.style.overflow = "visible";
            line.style.display = "block";
          });

          const computedStyle = window.getComputedStyle(element);
          const textIndent = computedStyle.textIndent;
          if (textIndent && textIndent !== "0px") {
            if (splitLines.length > 0) {
              splitLines[0].style.paddingLeft = textIndent;
            }
            element.style.textIndent = "0";
          }

          splitRefs.current.push(split);
          lines.current.push(...splitLines);
        });
        gsap.set(lines.current, { y: "100%" });

        const animationProps: gsap.TweenVars = {
          y: "0%",
          duration: 1,
          stagger: 0.1,
          ease: "expo.out",
          delay,
        };

        // Trigger animations
        if (animateOnScroll) {
          gsap.to(lines.current, {
            ...animationProps,
            scrollTrigger: {
              trigger: container,
              start: "top 75%",
              once: true,
            },
          });
        } else {
          gsap.to(lines.current, animationProps);
        }
      };

      runSplitAnimation();

      return () => {
        splitRefs.current.forEach((split) => {
          if (split) split.revert();
        });
      };
    },
    { scope: containerRef, dependencies: [animateOnScroll, delay] },
  );

  return (
    <div ref={containerRef} data-copy-wrapper="true" className="w-fit">
      {children}
    </div>
  );
}
