import LayoutWrapper from "@/shared/components/layouts/wrapper/LayoutWrapper";
import React from "react";

const DESKTOP_INDUSTRIES = [
  ["Real Estate", "Hospitality", "Education Consultancy", "E-commerce"],
  ["Automotive", "Fintech", "SaaS", "FMCG", "B2B", "B2C"],
];

const MOBILE_INDUSTRIES = [
  ["Automotive", "Fintech"],
  ["B2C", "E-commerce"],
  ["Education Consultancy"],
  ["SaaS", "FMCG", "B2B"],
  ["Real Estate", "Hospitality"],
];

export default function IndustriesWeWork() {
  return (
    <div className="py-[64px] lg:py-[12.5vw]">
      <LayoutWrapper>
        <div className="flex flex-col items-center justify-center text-center">
          <p className="text-[14px] lg:text-[0.972vw] text-[#007DB0] font-familjen uppercase">
            INDUSTRIES WE WORK IN
          </p>

          <div className="hidden lg:flex mt-[3.333vw] flex-col items-center gap-[0.56vw] w-full">
            {DESKTOP_INDUSTRIES.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="flex flex-wrap text-nowrap items-center justify-center gap-[0.56vw]"
              >
                {row.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="py-[0.83vw] px-[1.39vw] rounded-[1000px] flex items-center justify-center border border-black/80 w-fit bg-white"
                  >
                    <p className="text-[2.5vw] leading-none text-black tracking-tight -translate-y-[0.15vw]">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* MOBILE LAYOUT (Matches Mockup) */}
          <div className="flex lg:hidden mt-[24px] flex-col items-center gap-[4px] w-full">
            {MOBILE_INDUSTRIES.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="flex flex-wrap text-nowrap items-center justify-center gap-[4px]"
              >
                {row.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="py-[12px] px-[20px] rounded-[1000px] flex items-center justify-center border border-black/80 w-fit bg-white"
                  >
                    <p className="text-[24px] leading-none text-black ">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </LayoutWrapper>
    </div>
  );
}
