"use client";

import { gsap, useGSAP } from "@/lib/gsap";
import ArrowIcon from "@/shared/components/icons/ArrowIcon";
import LayoutWrapper from "@/shared/components/layouts/wrapper/LayoutWrapper";
import Button from "@/shared/components/ui/button/Button";
import React, { useRef } from "react";

const credibilityData = [
  {
    number: "1",
    title: "Senior Team",
    description:
      "Not spending yet, and want the research done right the first time ready for an honest answer, even an uncomfortable one.",
  },
  {
    number: "1",
    title: "Diagnosis",
    description:
      "A marketing agency diagnosing stalled growth, aligning on issues, and driving outcomes.",
  },
  {
    number: "10",
    title: "Industries",
    description:
      "B2B, B2C, FMCG, E-commerce, SaaS, Educational Consultancy, Real Estate, Hospitality, Automotive.",
  },
];

export default function CredibilityStripSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titlesRef = useRef<(HTMLDivElement | null)[]>([]);
  const descriptionsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const paths = gsap.utils.toArray<SVGPathElement>("#svgLine path");

      // Dynamic start trigger based on screen width
      const isMobile = window.innerWidth < 1024;
      const startPosition = isMobile ? "top top" : "top -10%";

      // Pin container and tie timeline to scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: startPosition,
          end: `+=${credibilityData.length * 100}%`,
          pin: true,
          scrub: true,
        },
      });

      const firstTitle = titlesRef.current[0];
      const firstDesc = descriptionsRef.current[0];
      if (firstTitle && firstDesc) {
        gsap.set([firstTitle, firstDesc], { opacity: 1 });
      }

      // Transition through items as user scrolls
      credibilityData.forEach((_, index) => {
        if (index === 0) return;

        const prevTitle = titlesRef.current[index - 1];
        const prevDesc = descriptionsRef.current[index - 1];
        const currentTitle = titlesRef.current[index];
        const currentDesc = descriptionsRef.current[index];
        const currentPath = paths[index];

        // Fade in current title (opacity 1) and description (opacity 1)
        if (currentTitle && currentDesc) {
          tl.to(
            [currentTitle, currentDesc],
            {
              opacity: 1,
              duration: 0.5,
              ease: "power1.inOut",
            },
            "<",
          );
        }

        // Illuminate corresponding SVG line segment
        if (currentPath) {
          tl.to(
            currentPath,
            {
              opacity: 1,
              duration: 0.5,
              ease: "power1.inOut",
            },
            "<",
          );
        }
      });
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="py-[64px] lg:min-h-screen overflow-x-hidden lg:py-[8.33vw] w-full bg-white text-black"
    >
      <LayoutWrapper>
        {/* Header Block */}
        <div className="flex items-end justify-between w-full">
          <div>
            <p className="lg:text-[3.3333vw] text-[32px] leading-[80%] tracking-[-2px]">
              Who is this for
            </p>
            <p className="mt-[32px] max-w-[457px] lg:block hidden text-[18px] font-haas text-[#000000A3] leading-[120%]">
              A marketing agency diagnosing stalled growth, aligning on issues,
              and driving outcomes.
            </p>
          </div>
          <Button
            variant="secondary"
            className="border-[#007DB0] text-[#007DB0] lg:block hidden"
          >
            Visit the link here <ArrowIcon className="ml-2 lg:ml-[0.56vw]" />
          </Button>
        </div>

        <div className="line w-full h-px bg-[#E7E7F1] mt-10 lg:mt-20"></div>

        <div className="flex justify-between mt-10 lg:mt-20">
          {/* Vertical SVG Progress Line (Preserved Exact SVG) */}
          <div>
            <svg
              id="svgLine"
              width="11"
              height="439"
              viewBox="0 0 11 439"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.33331 4.05312e-05C2.38779 4.04024e-05 -2.03752e-05 2.38786 -2.0504e-05 5.33337C-2.06328e-05 8.27889 2.38779 10.6667 5.33331 10.6667C8.27883 10.6667 10.6666 8.27889 10.6666 5.33337C10.6666 2.38786 8.27883 4.06599e-05 5.33331 4.05312e-05ZM4.33331 145.333C4.33331 145.886 4.78102 146.333 5.33331 146.333C5.88559 146.333 6.33331 145.886 6.33331 145.333L5.33331 145.333L4.33331 145.333ZM5.33331 5.33337L4.33331 5.33337L4.33331 145.333L5.33331 145.333L6.33331 145.333L6.33331 5.33337L5.33331 5.33337Z"
                fill="black"
              />
              <path
                opacity="0.2"
                d="M5.33331 146C2.38779 146 -2.0504e-05 148.388 -2.0504e-05 151.333C-2.0504e-05 154.279 2.38779 156.667 5.33331 156.667C8.27883 156.667 10.6666 154.279 10.6666 151.333C10.6666 148.388 8.27883 146 5.33331 146ZM4.33331 291.333C4.33331 291.886 4.78103 292.333 5.33331 292.333C5.8856 292.333 6.33331 291.886 6.33331 291.333H5.33331H4.33331ZM5.33331 151.333H4.33331L4.33331 291.333H5.33331H6.33331L6.33331 151.333H5.33331Z"
                fill="black"
              />
              <path
                opacity="0.2"
                d="M5.33331 292C2.38779 292 -2.0504e-05 294.388 -2.0504e-05 297.333C-2.0504e-05 300.279 2.38779 302.667 5.33331 302.667C8.27883 302.667 10.6666 300.279 10.6666 297.333C10.6666 294.388 8.27883 292 5.33331 292ZM4.33331 437.333C4.33331 437.886 4.78103 438.333 5.33331 438.333C5.8856 438.333 6.33331 437.886 6.33331 437.333H5.33331H4.33331ZM5.33331 297.333H4.33331L4.33331 437.333H5.33331H6.33331L6.33331 297.333H5.33331Z"
                fill="url(#paint0_linear_66_237)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_66_237"
                  x1="4.83331"
                  y1="297.333"
                  x2="4.83331"
                  y2="452.833"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#666666" />
                  <stop offset="1" stopColor="#666666" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="flex flex-col lg:gap-[8.19vw] lg:w-[31.74vw] gap-[128px] text-center">
            {credibilityData.map((item, index) => (
              <div
                key={index}
                ref={(el) => {
                  titlesRef.current[index] = el;
                }}
                className="opacity-30"
              >
                <p className="text-[20px] lg:text-[1.944vw] font-normal leading-[100%] text-black">
                  {item.title}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-[7.22vw] max-w-[168px] lg:max-w-[31.74vw]">
            {credibilityData.map((item, index) => (
              <div
                key={index}
                ref={(el) => {
                  descriptionsRef.current[index] = el;
                }}
                className="opacity-30"
              >
                <p className="text-[14px] font-haas lg:text-[1.111vw] text-black/60 leading-[130%] lg:leading-[120%]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        <Button
          variant="secondary"
          className="border-[#007DB0] text-[#007DB0] lg:hidden mt-10 w-full"
        >
          BOOK A DIAGNOSIS <ArrowIcon className="ml-2 lg:ml-[0.56vw]" />
        </Button>
      </LayoutWrapper>
    </div>
  );
}
