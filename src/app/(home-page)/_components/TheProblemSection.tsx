"use client";

import TextRevealOpacity from "@/shared/components/animations/TextRevelOpacity";
import ArrowIcon from "@/shared/components/icons/ArrowIcon";
import LayoutWrapper from "@/shared/components/layouts/wrapper/LayoutWrapper";
import Button from "@/shared/components/ui/button/Button";
import React, { useRef } from "react";

export default function TheProblemSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={sectionRef} className="relative w-full py-16 lg:py-[10.42vw] bg-white">
      <LayoutWrapper className="text-center">
        <p
          className="shrink-0 text-[14px] uppercase text-[#007DB0] lg:text-[0.972vw]"
        >
          THE PROBLEM, NAMED
        </p>

        <TextRevealOpacity
          as="h2"   
          type="words"
          scroll="scrub"
          triggerRef={sectionRef}
          start="top 70%"
          end="center 40%"
          scrubSmoothness={0.5}
          stagger={0.03}
          initialOpacity={0.15}
          className="mx-auto mt-[24px] mb-10  text-[32px] leading-[120%] tracking-[-0.04em] lg:mt-[3.333vw] lg:mb-[2.778vw] lg:max-w-[91.111vw] lg:text-[3.333vw] lg:tracking-[-0.139vw]"
        >
          Audits show what happened, diagnosis shows why and what to do next.
          Most marketing reports track activity, and most budgets follow last
          quarter's habits rather than this quarter's actual growth constraints.
          Whether you're fixing a leak or starting fresh, the rule is the same,
          know before you spend.
        </TextRevealOpacity>

        <Button
          variant="secondary"
          className="border-[#007DB0] text-[#007DB0]"
        >
          Visit the link here <ArrowIcon className="ml-2 lg:ml-[0.56vw]" />
        </Button>
      </LayoutWrapper>
    </div>
  );
}