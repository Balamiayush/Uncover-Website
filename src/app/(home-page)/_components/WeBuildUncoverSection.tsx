"use client";
import TextRevealOpacity from "@/shared/components/animations/TextRevelOpacity";
import ArrowIcon from "@/shared/components/icons/ArrowIcon";
import LayoutWrapper from "@/shared/components/layouts/wrapper/LayoutWrapper";
import Button from "@/shared/components/ui/button/Button";
import React, { useRef } from "react";

export default function WeBuildUncoverSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <div className="lg:py-[9.72vw] py-[64px] bg-[#1F1F1F]">
      <LayoutWrapper>
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
          className="mx-auto mt-12 mb-10 max-w-[1312px] text-[32px] leading-[120%] tracking-[-0.04em] lg:mt-[3.333vw] lg:mb-[2.778vw] lg:max-w-[91.111vw] lg:text-[3.333vw] lg:tracking-[-0.139vw] text-[#FFD900] text-center"
        >
          <span className="lg:block hidden">
            {" "}
            We built Uncover because we've lived on the client side of this gap
            where reports look promising but mean nothing, and wrong goals cost
            money, time, and confidence. We started Uncover to close it. Before
            we touch a single campaign, we find out what's actually limiting
            your growth, so every dollar you spend goes toward the right
            problem, not the comfortable metric.
          </span>
          <span className="lg:hidden block">
            {" "}
            We built Uncover because we've lived on the client side of the gap
            where reports look promising but mean nothing, and wrong goals cost
            money, time, and confidence.
          </span>
        </TextRevealOpacity>
        <div className=" items-center flex w-full justify-center lg:gap-[0.69vw] lg:mt-[3.89vw] flex-col gap-3 " >
          <Button className="w-full" variant="primary">
            START A PROJECT <ArrowIcon className="ml-2 lg:ml-[0.56vw]" />
          </Button>
          <Button className="w-full" variant="secondary">
            Contact Us <ArrowIcon className="ml-2 lg:ml-[0.56vw]" />
          </Button>
        </div>
      </LayoutWrapper>
    </div>
  );
}
