import LayoutWrapper from "@/shared/components/layouts/wrapper/LayoutWrapper";
import React from "react";

const INDUSTRIES = [
  ["Automotive", "Fintech", "SaaS", "FMCG", "B2B", "B2C"],
  ["E-commerce", "Real Estate", "Hospitality"],
  ["Education Consultancy"],
];

export default function IndustriesWeWork() {
  return (
    <div className="py-[12.5vw]">
      <LayoutWrapper>
        <div className="flex flex-col items-center justify-center text-center">
         <p className="text-[14px] lg:text-[0.972vw] text-[#007DB0] font-familjen uppercase ">
          INDUSTRIES WE WORK IN
          </p>

          <div className="mt-[3.333vw] flex flex-col items-center gap-[0.56vw] w-full">
            {INDUSTRIES.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="flex flex-wrap items-center justify-center gap-[0.56vw]"
              >
                {row.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="py-[0.83vw] px-[1.39vw] rounded-[1000px] flex items-center justify-center border border-black/80 w-fit bg-white"
                  >
                    <p className="text-[48px] lg:text-[3.333vw] leading-none font-medium text-black tracking-tight -translate-y-[0.15vw]">
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