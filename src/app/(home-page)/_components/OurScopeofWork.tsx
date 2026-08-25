"use client";

import ArrowIcon from "@/shared/components/icons/ArrowIcon";
import LayoutWrapper from "@/shared/components/layouts/wrapper/LayoutWrapper";
import TextSlide from "@/shared/components/ui/TextHoverAnim/TextSlide";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React, { useState } from "react";

export default function OurScopeofWork() {
  const data = [
    {
      title: "Performance Marketing",
      image:
        "https://images.unsplash.com/photo-1779896412291-dd291eaefd4b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Creative & Messaging",
      image:
        "https://images.unsplash.com/photo-1787163427371-321e46e2a7a3?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Funnel & Conversion",
      image:
        "https://images.unsplash.com/photo-1786977740883-efde738401ee?q=80&w=1137&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Tracking & Analytics",
      image:
        "https://images.unsplash.com/photo-1785294476332-642cbb69e90d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Performance Intelligence",
      image:
        "https://images.unsplash.com/photo-1779896412352-dd950bd9ce71?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % data.length);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev - 1 + data.length) % data.length);
  };

  const handleSelect = (index: number) => {
    if (isAnimating || activeIndex === index) return;
    setIsAnimating(true);
    setActiveIndex(index);
  };

  return (
    <div className="w-full min-h-screen py-[64px] lg:py-[8.33vw] bg-[#F6FAFC]">
      <LayoutWrapper className=" ">
        <div className="flex flex-col lg:flex-row w-full justify-between h-full">
          <h3 className="text-[32px] leading-[80%] tracking-[-1px] lg:text-[3.33vw] lg:leading-[80%] lg:tracking-[-2px] text-black">
            Our Scope of Work
          </h3>
          <p className="hidden lg:block text-[1.25vw] text-[#000000A3] font-haas max-w-[34.5833vw]">
            We bring the diagnosis into execution by working alongside your team
            to address the gaps that matters.
          </p>
        </div>
        <div className="w-full h-[1px] lg:h-[0.0694vw] bg-[#E7E7F1] my-[24px] lg:my-[5.5556vw]"></div>

        <div className="h-auto lg:h-[32.2917vw] flex flex-col lg:flex-row gap-[40px] lg:gap-0 lg:justify-between w-full ">
          <div className="flex flex-col justify-between h-full w-full lg:w-auto">
            <div className="flex flex-row justify-between h-full  lg:flex-col max-lg:items-end  lg:gap-[1.9444vw]">
              <div className="flex flex-col gap-[16px] lg:gap-[1.9444vw]">
                {data.map((item, index) => {
                  const isActive = activeIndex === index;

                  return (
                    <p
                      key={index}
                      onClick={() => handleSelect(index)}
                      className={`uppercase flex items-center gap-[8px] lg:gap-[0.5556vw] text-[14px] leading-[120%] tracking-[0px] lg:text-[1.1111vw] cursor-pointer transition-colors duration-300 ${
                        isActive ? "text-[#007DB0]" : "text-[#000000]"
                      }`}
                    >
                      <span>{item.title}</span>
                      {isActive && <ArrowIcon className=" " />}
                    </p>
                  );
                })}
              </div>

              {/* Navigation Arrows */}
              <div className="flex lg:mt-0">
                <div
                  id="next"
                  onClick={handlePrev}
                  className="border border-r-0 border-[#00000099] w-[44px] h-[44px] lg:w-[3.75vw] lg:h-[3.75vw] lg:border-[0.1042vw] lg:py-[0.6944vw] flex items-center justify-center lg:items-end rounded-l-[2px] lg:rounded-[0.1389vw] cursor-pointer select-none hover:bg-black/5 transition-colors"
                >
                  <ArrowIcon className="rotate-180" />
                </div>
                <div
                  id="prev"
                  onClick={handleNext}
                  className="border border-[#00000099] w-[44px] h-[44px] lg:w-[3.75vw] lg:h-[3.75vw] lg:border-[0.1042vw] lg:py-[0.6944vw] flex items-center justify-center lg:items-end rounded-r-[2px] lg:rounded-[0.1389vw] cursor-pointer select-none hover:bg-black/5 transition-colors"
                >
                  <ArrowIcon />
                </div>
              </div>
            </div>
          </div>

          {/* Image Container */}
          <div id="img" className="w-full lg:w-auto lg:h-full">
            <div className="relative w-full h-[281px] lg:w-[46.1111vw] lg:h-[32.2917vw] overflow-hidden rounded-[8px] lg:rounded-[0.5556vw] bg-[#E7E7F1]">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={activeIndex}
                  initial={{
                    clipPath: "inset(50% 50% 50% 50%)",
                    scale: 1.1,
                  }}
                  animate={{
                    clipPath: "inset(0% 0% 0% 0%)",
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                  onAnimationComplete={() => setIsAnimating(false)}
                  transition={{
                    duration: 0.6,
                    ease: [0.25, 1, 0.5, 1],
                  }}
                  className="absolute inset-0 w-full h-full"
                >
                  <Image
                    alt={data[activeIndex].title}
                    src={data[activeIndex].image}
                    fill
                    sizes="(max-width: 1024px) 100vw, 46vw"
                    priority
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </LayoutWrapper>
    </div>
  );
}
