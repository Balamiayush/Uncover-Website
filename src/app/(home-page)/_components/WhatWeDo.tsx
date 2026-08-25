import ArrowIcon from "@/shared/components/icons/ArrowIcon";
import LayoutWrapper from "@/shared/components/layouts/wrapper/LayoutWrapper";
import Button from "@/shared/components/ui/button/Button";
import React from "react";

export default function WhatWeDo() {
  return (
    <div className="py-[48px] lg:py-[8.33vw] w-full h-full bg-[#fff]">
      <LayoutWrapper>
        <div className="flex flex-col lg:flex-row w-full justify-between items-start gap-10 lg:gap-0">
          <div>
            <h3 className="text-[32px] lg:text-[3.3333vw] tracking-[-1px] lg:tracking-[-2px] leading-[100%] lg:leading-[80%]  text-black">
              The Growth Diagnosis
            </h3>
            <p className="text-[14px] my-[2.2222vw] lg:text-[1.111vw] max-w-[380px] lg:max-w-[25vw] font-haas text-[#000000B2] leading-[130%] lg:leading-[120%] lg:block hidden">
              Before we spend a dollar of your budget, we spend our time finding
              out where it should go. Everything else comes after.
            </p>
            <Button
              variant="secondary"
              className="border-[#007DB0] text-[#007DB0] max-lg:hidden"
            >
              Visit the link here <ArrowIcon className="ml-2 lg:ml-[0.56vw]" />
            </Button>
          </div>

          <div className="   lg:max-w-[49.6528vw] flex flex-col gap-[2px] bg-[#EAEFF2]">
            {/* Discovery Call */}
            <div className="p-5 gap-[48px] lg:p-[1.9444vw] lg:gap-[2.2222vw] rounded-t-[0.2778vw] w-full flex flex-col bg-[#F6FAFC]">
              <p className="lg:text-[1.9444vw] text-[24px] leading-[100%] tracking-[-0.0694vw]  text-black">
                Discovery Call
              </p>
              <p className="font-haas text-[14px] max-lg:max-w-[326px] lg:text-[1.1111vw] text-[#000000B2]">
                We understand the business and the desired outcome.
              </p>
            </div>
            <div className="p-5 gap-[48px] lg:p-[1.9444vw] lg:gap-[2.2222vw] rounded-t-[0.2778vw] w-full flex flex-col bg-[#F6FAFC]">
              <p className="lg:text-[1.9444vw] text-[24px] leading-[100%] tracking-[-0.0694vw]  text-black">
                Discovery Call
              </p>
              <p className="font-haas text-[14px] max-lg:max-w-[326px] lg:text-[1.1111vw] text-[#000000B2]">
                We understand the business and the desired outcome.
              </p>
            </div>

            {/* Alignment Workshop */}
            <div className="py-5 px-[20px] gap-[48px] lg:p-[1.9444vw] lg:gap-[2.2222vw] rounded-b-[0.2778vw] w-full flex flex-col bg-[#F6FAFC]">
              <p className="lg:text-[1.9444vw] text-[24px] leading-[100%] tracking-[-0.0694vw]  text-black">
                Alignment Workshop
              </p>
              <div className="font-haas text-[14px] max-lg:max-w-[326px] lg:text-[1.1111vw] text-[#000000B2] flex flex-col gap-[0.56vw]">
                <p>That includes :</p>
                <ul className="list-disc list-inside space-y-[0.2778vw] pl-[0.2778vw]">
                  <li>Executive Summary</li>
                  <li>Growth Diagnosis</li>
                  <li>Competitive Snapshot 90-Day Roadmap</li>
                </ul>
              </div>
            </div>
          </div>
          <Button
            variant="secondary"
            className="border-[#007DB0] text-[#007DB0] lg:hidden "
          >
            Visit the link here <ArrowIcon className="ml-2 lg:ml-[0.56vw]" />
          </Button>
        </div>
      </LayoutWrapper>
    </div>
  );
}
