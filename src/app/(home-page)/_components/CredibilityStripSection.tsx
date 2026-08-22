import LayoutWrapper from "@/shared/components/layouts/wrapper/LayoutWrapper";
import StartAProjectBtn from "@/shared/components/ui/button/StartAProjectBtn";
import React from "react";

const credibilityData = [
  {
    number: "1",
    title: "Senior Team",
    description:
      "No rotating bench. Direct access to the people actually thinking through your problem every variable, every engagement audited.",
  },
  {
    number: "1",
    title: "Diagnosis",
    description:
      "Before any spend, campaign, or channel recommendation. A budget without a diagnosis is just an expensive guess.",
  },
  {
    number: "10",
    title: "Industries",
    description:
      "Fintech, Edtech, SaaS, E-commerce, FMCG, B2B, B2C, Automotive, Real Estate, Hospitality.",
  },
];

export default function CredibilityStripSection() {
  return (
    <div className="py-[48px] lg:py-[8.33vw] w-full bg-white text-black">
      <LayoutWrapper>
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 lg:gap-0">
          <div className="flex flex-col gap-4 lg:gap-[1.667vw]">
            <h3 className="text-[36px] lg:text-[5vw] tracking-[-1px] lg:tracking-[-0.208vw] leading-[100%] lg:leading-[80%] font-normal">
              Credibility Strip
            </h3>
            <p className="text-[14px] lg:text-[1.111vw] max-w-[380px] lg:max-w-[24.03vw] text-black/60 leading-[130%] lg:leading-[120%]">
              A marketing agency diagnosing stalled growth, aligning on issues,
              and driving outcomes.
            </p>
          </div>
          <StartAProjectBtn variant="black" />
        </div>

        {/* Credibility Items Table/List */}
        <div className="mt-12 lg:mt-[5.556vw] flex flex-col border-b border-[#E7E7F1]">
          {credibilityData.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-1 lg:grid-cols-12 items-start lg:items-center py-6 lg:py-[2.778vw] border-t border-[#E7E7F1] gap-4 lg:gap-0"
            >
              {/* Stat Number */}
              <div className="lg:col-span-4">
                <span className="text-[48px] lg:text-[4.444vw] leading-[100%] font-normal text-black/80">
                  {item.number}
                </span>
              </div>

              {/* Title */}
              <div className="lg:col-span-4">
                <p className="text-[20px] lg:text-[1.944vw] font-normal leading-[100%] text-black/70">
                  {item.title}
                </p>
              </div>

              {/* Description */}
              <div className="lg:col-span-4">
                <p className="text-[14px] lg:text-[1.111vw] text-black/60 leading-[130%] lg:leading-[120%] max-w-[340px] lg:max-w-[23.611vw]">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </LayoutWrapper>
    </div>
  );
}
