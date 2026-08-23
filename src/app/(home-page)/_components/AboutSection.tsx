import LayoutWrapper from "@/shared/components/layouts/wrapper/LayoutWrapper";
import React from "react";

export default function AboutSection() {
  return (
    <div className="py-[48px] lg:py-[8.33vw] w-full h-full">
      <LayoutWrapper>
        <div className="flex flex-col lg:flex-row ">
          <p className="text-[14px] lg:text-[0.972vw] text-[#007DB0]  uppercase shrink-0">
            ABOUT
          </p>

        <h2 className="text-[32px] max-lg:mt-4 lg:text-[5vw] leading-[103%] lg:leading-[90%] tracking-[-1px] lg:tracking-[-0.208vw] text-black max-w-[356px] lg:max-w-[85.69vw]">
            <span className="hidden lg:inline-block lg:w-[14.097vw] h-1" />
            Uncover is a performance marketing agency that diagnoses the
            variables behind stalled growth and aligns on what's off, and drives
            the resulting outcome.
          </h2>
        </div>

        <div className="w-full h-[1px] lg:h-[0.069vw] bg-[#E7E7F1] mt-6 lg:mt-[5vw]" />
        <div className=" mt-6 flex lg:flex-row flex-col justify-between items-start gap-10 lg:gap-0 w-full lg:mt-[5vw]">
          <p className="text-[14px] lg:text-[1.11vw] max-w-[277px]  lg:max-w-[23.47vw] leading-[120%] uppercase">
            Uncover is a small team of marketing leaders with 10+ years driving
            growth across APAC, EMEA, and North America.
          </p>
        </div>
      </LayoutWrapper>
    </div>
  );
}
