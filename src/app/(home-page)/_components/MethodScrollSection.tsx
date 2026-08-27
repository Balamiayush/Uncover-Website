"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LayoutWrapper from "@/shared/components/layouts/wrapper/LayoutWrapper";
import Image from "next/image";
import Button from "@/shared/components/ui/button/Button";
import ArrowIcon from "@/shared/components/icons/ArrowIcon";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STEPS = [
  {
    num: "1",
    title: "DIAGNOSE: FIND THE REAL CONSTRAINT.",
    desc: "We analyse your funnel, positioning, customer journey, economics, and data to identify what's actually holding back growth.",
    positionClass: "lg:top-[10%] lg:right-[-29%] md:top-[10%] md:right-[-16%] top-[6%]",
  },
  {
    num: "2",
    title: "PRIORITISE: FOCUS ON WHAT MOVES THE NEEDLE.",
    desc: "Not every problem deserves immediate attention. We find the highest-impact opportunities and decide what to fix first.",
    positionClass: "lg:top-[28%] lg:left-[1%] md:top-[28%] md:left-[2%] top-[23%] right-[-1%]",
  },
  {
    num: "3",
    title: "BUILD: TURN STRATEGY INTO ACTION.",
    desc: "We launch focused campaigns built around clear hypotheses, measurable outcomes, and informed decisions.",
    positionClass: "lg:top-[49%] lg:right-[-60%] md:top-[42%] md:right-[-15%] top-[40%]",
  },
  {
    num: "4",
    title: "MEASURE: BUSINESS IMPACT OVER VANITY METRICS.",
    desc: "We connect marketing performance to outcomes that matter revenue, retention, profitability.",
    positionClass: "lg:top-[66%] lg:left-[-3%] md:top-[66%] md:left-[-1%] top-[62%] left-[40%]",
  },
  {
    num: "5",
    title: "COMPOUND: BUILD WHAT KEEPS WORKING.",
    desc: "Successful campaigns become repeatable systems that keep improving over time.",
    positionClass: "lg:top-[89%] lg:right-[-31%] md:top-[86%] md:right-[-12%] top-[80%]",
  },
];

const VB_W = 573;
const VB_H = 1482;

export default function MethodScrollSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mobilePathRef = useRef<SVGPathElement>(null);
  const tabletPathRef = useRef<SVGPathElement>(null);
  const desktopPathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const paths = [
      mobilePathRef.current,
      tabletPathRef.current,
      desktopPathRef.current,
    ].filter((path): path is SVGPathElement => path !== null);

    paths.forEach((path) => {
      const pathLength = path.getTotalLength();
      gsap.set(path, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength * 0.9,
      });
    });

    const ctx = gsap.context(() => {
      paths.forEach((path) => {
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
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative w-full py-16 lg:py-[6.53vw] min-h-screen"
    >
      <Image
        alt=""
        fill
        className="object-cover"
        src={"/images/hero-section-img/hero-section-bg.png"}
      />
      <LayoutWrapper>
        <div className="relative z-10">
          <p className="text-[14px] lg:text-[0.972vw] md:text-[1.2vw] text-[#FFD900] font-familjen uppercase">
            THE METHOD
          </p>
          <h2 className="text-[32px] mt-4 lg:mt-[1.6667vw] md:text-[42px] leading-[100%] lg:leading-[80%] tracking-[-2px] lg:text-[3.33vw] text-white">
            80% Diagnosis. 20% Execution
          </h2>
          <p className="text-[14px] lg:text-[1.25vw] md:text-[16px] text-[#FFFFFFB8] mt-4 lg:mt-8">
            Most of the work happens before a campaign ever goes live.
          </p>
        </div>

        {/* Mobile SVG Path View */}
        <div className="block md:hidden flex flex-col gap-10 mt-12 relative pl-2">
          <div>
            <svg
              width="280"
              height="788"
              viewBox="0 0 280 788"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                ref={mobilePathRef}
                d="M6.72666 71.7566C6.72666 71.7566 232.859 -46.2978 263.875 21.4999C306.561 114.804 -26.2799 290.539 2.23594 374.847C23.681 438.25 301.825 313.35 277.84 415.201C263.875 474.5 -53.6602 558.5 16.8398 661.5C98.8323 781.29 241.84 787.5 241.84 787.5"
                stroke="url(#paint0_linear_mobile)"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_mobile"
                  x1="48.2623"
                  y1="-74.1368"
                  x2="116.831"
                  y2="746.955"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="white" stopOpacity="0" />
                  <stop offset="0.125" stopColor="white" />
                  <stop offset="0.778846" stopColor="white" />
                  <stop offset="0.966346" stopColor="white" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {STEPS.map((step, idx) => (
            <div
              key={idx}
              className={`absolute z-10 flex items-start gap-4 ${step.positionClass}`}
            >
              <span className="w-8 h-8 bg-white text-black text-sm font-bold flex items-center justify-center rounded-full border-5 border-[#3e3e3e] shrink-0">
                {step.num}
              </span>
              <div>
                <p className="text-[14px] max-w-[191px] text-white font-medium uppercase leading-snug">
                  {step.title}
                </p>
                <p className="text-[13px] hidden font-haas text-[#FFFFFFCC] mt-2 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Tablet SVG Path View */}
        <div
          className="hidden md:block lg:hidden relative mt-8 ml-[10vw]"
          style={{
            width: `min(100%, ${(VB_W / 900) * 100}vw)`,
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
              ref={tabletPathRef}
              d="M203.208 1.00024C203.208 1.00024 347.734 51.7516 388.46 185.613C429.186 319.474 24.1445 313.683 24.1445 479.221C24.1445 644.759 571.145 629.43 571.145 780C571.145 944.042 -353.355 867.5 152.144 1185.5C247.042 1245.64 409.145 1299.5 392.145 1365.5C375.145 1431.5 274.145 1481 274.145 1481"
              stroke="url(#paint0_linear_tablet)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient
                id="paint0_linear_tablet"
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
              className={`absolute flex items-center gap-4 w-[35vw] ${step.positionClass}`}
            >
              <div className="w-10 h-10 bg-white text-black text-base text-center flex items-center justify-center rounded-full border-4 border-[#3e3e3e] font-haas shrink-0">
                {step.num}
              </div>
              <div>
                <p className="text-[16px] text-nowrap mb-2 text-white uppercase">
                  {step.title}
                </p>
                <p className="font-haas text-[14px] hidden max-w-[32vw] leading-[120%] text-[#FFFFFFCC]">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Interactive SVG Path View */}
        <div
          className="hidden lg:block relative mt-[4vw] ml-[17.22vw]"
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
              ref={desktopPathRef}
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
              className={`absolute flex items-center gap-[1.2vw] w-[26vw] ${step.positionClass}`}
            >
              <div className="w-[3.125vw] h-[3.125vw] bg-white text-black text-[0.9vw] text-center flex items-center justify-center rounded-full border-4 border-[#3e3e3e] font-haas shrink-0">
                {step.num}
              </div>
              <div>
                <p className="text-[1.39vw] mb-[1.11vw] text-white uppercase text-nowrap">
                  {step.title}
                </p>
                <p className="font-haas text-[1.1111vw] max-w-[31vw] leading-[120%] text-[#FFFFFFCC]">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <Button variant="secondary" className="max-md:w-full mt-12">
          START A PROJECT
          <ArrowIcon className="lg:ml-[0.56vw] ml-2" />
        </Button>
      </LayoutWrapper>
    </div>
  );
}