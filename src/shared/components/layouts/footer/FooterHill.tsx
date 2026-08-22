"use client";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LayoutWrapper from "@/shared/components/layouts/wrapper/LayoutWrapper"; // Update this path if necessary
import LuxuryFluidLayer from "@/app/(home-page)/_components/InteractiveFluidLayer";

gsap.registerPlugin(ScrollTrigger);

export default function FooterHill() {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const textLogoRef = useRef<HTMLDivElement>(null);

  // Unique references for each depth layer
  const hillBackRef = useRef<HTMLDivElement>(null);
  const hillFifthRef = useRef<HTMLDivElement>(null);
  const hillFourthRef = useRef<HTMLDivElement>(null);
  const hillThirdRef = useRef<HTMLDivElement>(null);
  const hillSecRef = useRef<HTMLDivElement>(null);
  const hillFrontRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!triggerRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top bottom",
          end: "bottom bottom",
          scrub: true,
        },
      });

      tl.fromTo(
        hillBackRef.current,
        { yPercent: 15 },
        { yPercent: -5, ease: "none" },
        0,
      )

        .fromTo(
          hillFifthRef.current,
          { yPercent: 12 },
          { yPercent: -8, ease: "none" },
          0,
        )
        .fromTo(
          hillFourthRef.current,
          { yPercent: 10 },
          { yPercent: -10, ease: "none" },
          0,
        )
        .fromTo(
          hillThirdRef.current,
          { yPercent: 8 },
          { yPercent: -12, ease: "none" },
          0,
        )
        .fromTo(
          hillSecRef.current,
          { yPercent: 5 },
          { yPercent: -15, ease: "none" },
          0,
        );
    },
    { scope: triggerRef },
  );

  return (
    <div ref={triggerRef} className="w-full relative overflow-hidden mt-[4vw] ">
      <div
        ref={containerRef}
        className="min-h-screen relative w-full flex flex-col justify-end"
      >
        <div className="absolute inset-0 w-full h-full pointer-events-none select-none min-h-screen z-0">
          {/* Deepest Background Hill */}
          <div
            ref={hillBackRef}
            className="absolute -bottom-[1vw] w-full h-auto"
          >
            <img
              className="w-full h-auto object-cover object-bottom"
              src="/images/hero-img/last-hill.svg"
              alt="Background hill"
            />
          </div>

          <div
            ref={textLogoRef}
            className="absolute w-[90%] -translate-x-1/2 left-1/2 h-auto z-10 bottom-[8vw]"
          >
            <img
              className="w-full h-full text-white/90"
              src="https://res.cloudinary.com/dfajjqglx/image/upload/v1784539359/NDPL_yacp2l.svg"
              alt="NDPL Text Logo"
            />
          </div>

          {/* Fifth Hill Layer */}
          <div
            ref={hillFifthRef}
            className="absolute -bottom-[5vw] left-[25vw] w-full h-auto"
          >
            <img
              className="w-full h-auto object-cover object-bottom"
              src="/images/hero-img/five-hill.svg"
              alt="Fifth far hill"
            />
          </div>

          {/* Fourth Hill Layer */}
          <div
            ref={hillFourthRef}
            className="absolute -bottom-[2vw] left-0 w-full h-auto"
          >
            <img
              className="w-full h-auto object-cover object-bottom"
              src="/images/hero-img/four-hill.svg"
              alt="Fourth mid hill"
            />
          </div>

          {/* Third Hill Layer */}
          <div
            ref={hillThirdRef}
            className="absolute -bottom-[5vw] left-[25vw] w-full h-auto"
          >
            <img
              className="w-full h-auto object-cover object-bottom"
              src="/images/hero-img/third-hill-v1.svg"
              alt="Third mid hill"
            />
          </div>

          <div
            ref={hillSecRef}
            className="absolute -bottom-[5vw] -left-[25vw] w-full h-auto"
          >
            <img
              className="w-full h-auto object-cover object-bottom"
              src="/images/hero-img/sec-hill-v1.svg"
              alt="Second close hill"
            />
          </div>

          <div
            ref={hillFrontRef}
            className="absolute -bottom-2 w-full h-auto z-20"
          >
            <img
              className="w-full h-auto object-cover object-bottom"
              src="/images/hero-img/first-hill-v1.svg"
              alt="Foreground landscape hill"
            />
          </div>
        </div>

        <div className="relative w-full py-10 z-[1000] mt-auto">
          <LayoutWrapper>
            <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-6 sm:gap-0">
              <div className="flex gap-2 text-[#FFFFFFB2]">
                <p className="text-[16px] cursor-pointer hover:text-white transition-colors duration-200">
                  Privacy policy
                </p>
                <p className="text-[16px] select-none">|</p>
                <p className="text-[16px] cursor-pointer hover:text-white transition-colors duration-200">
                  Terms and conditions
                </p>
              </div>

              <div className="flex gap-[24px]">
                <button className="border border-white/60 hover:border-white h-[56px] w-[56px] rounded-full flex items-center justify-center text-white transition-all bg-transparent cursor-pointer backdrop-blur-xs">
                  EN
                </button>
                <button className="border border-white/60 hover:border-white h-[56px] w-[56px] rounded-full flex items-center justify-center text-white transition-all bg-transparent cursor-pointer backdrop-blur-xs">
                  NP
                </button>
              </div>

              <p className="text-[16px] text-[#FFFFFFB2] text-center sm:text-right">
                © Copyright NDPL 2026 All Rights Reserved.
              </p>
            </div>
          </LayoutWrapper>
        </div>
      </div>
    </div>
  );
}
