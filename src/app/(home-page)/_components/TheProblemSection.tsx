"use client";

import ArrowIcon from "@/shared/components/icons/ArrowIcon";
import LayoutWrapper from "@/shared/components/layouts/wrapper/LayoutWrapper";
import Button from "@/shared/components/ui/button/Button";

import React, { useRef } from "react";

export default function TheProblemSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={sectionRef} className="w-full relative lg:py-[10.42vw]">
      <LayoutWrapper className="text-center">
        <p className="text-[14px] lg:text-[0.972vw] text-[#007DB0] uppercase shrink-0">
          THE PROBLEM, NAMED
        </p>

        <h2 className="max-w-[1312px] mx-auto mt-[48px] mb-[40px] text-[48px] leading-[120%] tracking-[-2px]">
          Audits show what happened, diagnosis shows why and what to do next.
          Most marketing reports track activity, and most budgets follow last
          quarter's habits rather than this quarter's actual growth constraints.
          Whether you're fixing a leak or starting fresh, the rule is the same,
          know before you spend.
        </h2>

        <Button variant="secondary" className="border-[#007DB0] text-[#007DB0]">
          Visit the link here <ArrowIcon className="ml-[0.56vw]" />
        </Button>
      </LayoutWrapper>
    </div>
  );
}
