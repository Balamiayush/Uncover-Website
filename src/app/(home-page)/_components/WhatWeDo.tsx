import LayoutWrapper from "@/shared/components/layouts/wrapper/LayoutWrapper";
import React from "react";

export default function WhatWeDo() {
  return (
    <div className="py-[48px] lg:py-[8.33vw] w-full h-full bg-[#F6FAFC]">
      <LayoutWrapper>
        <div className="flex flex-col lg:flex-row w-full justify-between items-start gap-10 lg:gap-0">
          <h3 className="text-[36px] lg:text-[5vw] tracking-[-1px] lg:tracking-[-0.208vw] leading-[100%] lg:leading-[80%] font-normal text-black">
            What we do
          </h3>

          <div className="flex flex-col gap-8 lg:gap-[4.17vw]  w-full lg:max-w-[52.361vw]">
            <p className="text-[14px] lg:text-[1.111vw] max-w-[380px] lg:max-w-[26vw] text-[#000000B2] leading-[130%] lg:leading-[120%]">
              Uncover is a performance marketing agency that diagnoses the
              variables behind stalled growth, aligns on what's off, and drives
              the resulting outcome
            </p>

            <div className="bg-white rounded-xl lg:rounded-[0.556vw]  overflow-hidden border border-[#E7E7F1]/60">
              <div className="flex flex-col lg:flex-row gap-4 lg:gap-[2.778vw] py-6 px-5 lg:py-[2.222vw] lg:px-[1.389vw] border-b border-[#E7E7F1]">
                <p className="text-[20px] lg:text-[1.944vw] leading-[100%] text-black font-normal min-w-[180px] lg:min-w-[12.5vw]">
                  The Diagnosis
                </p>
                <p className="max-w-[505px] lg:max-w-[35.069vw] text-[#000000CC] text-[14px] lg:text-[1.111vw] leading-[130%] lg:leading-[120%]">
                  We identify what's limiting your growth - offer, audience,
                  messaging, channels, tracking, conversions, before you spend
                  another dollar.
                </p>
              </div>

              <div className="flex flex-col lg:flex-row gap-4 lg:gap-[2.778vw] py-6 px-5 lg:py-[2.222vw] lg:px-[1.389vw]">
                <p className="text-[20px] lg:text-[1.944vw] leading-[100%] text-black font-normal min-w-[180px] lg:min-w-[12.5vw]">
                  The Outcome
                </p>
                <p className="max-w-[505px] lg:max-w-[35.069vw] text-[#000000CC] text-[14px] lg:text-[1.111vw] leading-[130%] lg:leading-[120%]">
                  When the right variables align, performance compounds. When
                  they don't, more budget only amplifies the problem.
                </p>
              </div>
            </div>
          </div>
        </div>
      </LayoutWrapper>
    </div>
  );
}
