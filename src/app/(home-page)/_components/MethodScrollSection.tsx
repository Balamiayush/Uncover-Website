"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LayoutWrapper from "@/shared/components/layouts/wrapper/LayoutWrapper";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STEPS = [
  {
    num: "1",
    title: "DIAGNOSE: FIND THE REAL CONSTRAINT.",
    desc: "We analyse your funnel, positioning, customer journey, economics, and data to identify what's actually holding back growth.",
    positionClass: "top-[12%] right-[-31%] ",
  },
  {
    num: "2",
    title: "PRIORITISE: FOCUS ON WHAT MOVES THE NEEDLE.",
    desc: "Not every problem deserves immediate attention. We find the highest-impact opportunities and decide what to fix first.",
    positionClass: "top-[30%] left-[3%]  ",
  },
  {
    num: "3",
    title: "BUILD: TURN STRATEGY INTO ACTION.",
    desc: "We launch focused campaigns built around clear hypotheses, measurable outcomes, and informed decisions.",
    positionClass: "top-[52%] right-[-62%]",
  },
  {
    num: "4",
    title: "MEASURE: BUSINESS IMPACT OVER VANITY METRICS.",
    desc: "We connect marketing performance to outcomes that matter revenue, retention, profitability.",
    positionClass: "top-[68%] left-[-1%] ",
  },
  {
    num: "5",
    title: "COMPOUND: BUILD WHAT KEEPS WORKING.",
    desc: "Successful campaigns become repeatable systems that keep improving over time.",
    positionClass: "top-[90%] right-[-31%]",
  },
];

const VB_W = 573;
const VB_H = 1482;
const RATIO = VB_H / VB_W; // ~2.5864

export default function MethodScrollSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const path = pathRef.current;
    const section = sectionRef.current;
    if (!path || !section) return;

    const pathLength = path.getTotalLength();

    // Initial setup: 10% visible (90% offset)
    gsap.set(path, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength * 0.9,
    });

    const ctx = gsap.context(() => {
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative w-full bg-black py-16 lg:py-[6.53vw] min-h-screen"
    >
      <LayoutWrapper>
        {/* Header */}
        <div className="relative z-10">
          <p className="text-[14px] lg:text-[0.972vw] text-[#FFD900] font-familjen uppercase">
            THE METHOD
          </p>
          <h2 className="text-[32px] mt-6 leading-[80%] tracking-[-2px] lg:text-[3.33vw] text-white">
            80% Diagnosis. 20% Execution
          </h2>
          <p className="text-[1.25vw] lg:block hidden text-[#FFFFFFB8] mt-8">
            Most of the work happens before a campaign ever goes live.
          </p>
        </div>

        <div
          className="relative mt-12 lg:mt-[4vw] ml-0 lg:ml-[17.22vw]"
          style={{
            width: `min(100%, ${(VB_W / 1440) * 100}vw)`,
            aspectRatio: `${VB_W} / ${VB_H}`,
          }}
        >
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            preserveAspectRatio="xMidYMid meet"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              ref={pathRef}
              d="M203.208 1.00024C203.208 1.00024 347.734 51.7516 388.46 185.613C429.186 319.474 24.1445 313.683 24.1445 479.221C24.1445 644.759 571.145 629.43 571.145 780C571.145 944.042 -353.355 867.5 152.144 1185.5C247.042 1245.64 409.145 1299.5 392.145 1365.5C375.145 1431.5 274.145 1481 274.145 1481"
              stroke="url(#paint0_linear_327_1593)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient
                id="paint0_linear_327_1593"
                x1="298.893"
                y1="1.00024"
                x2="266.508"
                y2="1480.96"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="white" stopOpacity="0" />
                <stop offset="0.125" stopColor="white" />
                <stop offset="0.778846" stopColor="white" />
                <stop offset="0.966346" stopColor="white" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>

          {STEPS.map((step, idx) => (
            <div
              key={idx}
              ref={(el) => {
                stepRefs.current[idx] = el;
              }}
              className={`absolute flex items-start gap-4 lg:gap-[1.2vw] w-[75%] lg:w-[26vw] ${step.positionClass}`}
            >
              <span className="w-6 h-6 lg:w-[1.9vw] lg:h-[1.9vw] bg-white text-black text-xs lg:text-[0.9vw] font-bold text-center flex items-center justify-center rounded-full border-[6px] border-[#FFFFFF33] shrink-0">
                {step.num}
              </span>
              <div>
                <p className="text-[14px] lg:text-[1.39vw]  text-white uppercase text-nowrap ">
                  {step.title}
                </p>
                <p className="text-[12px] lg:text-[0.9vw] max-w-[31vw] leading-[120%]  text-[#FFFFFFCC]">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </LayoutWrapper>
    </div>
  );
}
