import TextReveal from "@/shared/components/animations/TextReveal";
import LayoutWrapper from "@/shared/components/layouts/wrapper/LayoutWrapper";
import Image from "next/image";
import React from "react";

export default function CeoSection() {
  return (
    <div className="py-[40px] lg:py-[8.33vw] bg-[#F6FAFC]">
      <LayoutWrapper className="flex flex-col lg:flex-row lg:justify-between gap-[40px] lg:gap-0">
        <div className="lg:hidden">
          <h2 className="text-[32px] leading-[80%] max-w-[336px] tracking-[-1px] text-black">
            We've sat on the other side of this
          </h2>
        </div>

        {/* Profile / Image Column */}
        <div className="w-full lg:w-[32.92vw]">
          <div className="relative w-full h-[286px] lg:w-[32.92vw] lg:h-[30.83vw] rounded-[8px] lg:rounded-[0.56vw] overflow-hidden">
            <Image
              fill
              src="https://i.pinimg.com/1200x/35/16/9f/35169f77d14878a39f31ec1ffac3e115.jpg"
              alt="Yogita Agrawal"
              className="object-cover"
            />
          </div>
          <div className="mt-[22px] lg:mt-[1.39vw]">
            <p className="text-[22px] lg:text-[1.94vw] leading-[80%] tracking-[-0.07vw] font-normal text-black">
              Yogita Agrawal
            </p>
            <p className="mt-[6px] lg:mt-[1.11vw] text-[14px] lg:text-[1.11vw] leading-[120%] text-[#000000B8] font-haas">
              CEO, Uncover
            </p>
          </div>
        </div>

        {/* Text Content Column */}
        <div className="w-full lg:w-[48.19vw] flex flex-col justify-between">
          {/* Header for Desktop */}
          <div className="hidden lg:block">
            <TextReveal>
              <h2 className="text-[3.33vw] leading-[80%] tracking-[-0.21vw] text-black">
                We've sat on the other side of this
              </h2>
            </TextReveal>
            <TextReveal>
              <p className="font-haas text-[1.25vw] leading-[120%] mt-[1.67vw] text-[#000000B8]">
                Uncover was built by someone who's read the reports that meant
                nothing.
              </p>
            </TextReveal>
          </div>

          <div className="flex gap-[20px] lg:gap-[1.39vw] flex-col">
            <TextReveal>
              <p className="text-[14px] lg:text-[1.11vw] text-[#000000B8] font-haas leading-[120%]">
                I'm Yogita Agrawal. Before Uncover, I scaled huge restaurant
                chains at Zomato, worked CXO-level revenue-protection mandates
                at Velocity, and led international expansion at Karobar.
              </p>
            </TextReveal>
            <TextReveal>
              <p className="text-[14px] lg:text-[1.11vw] text-[#000000B8] font-haas leading-[120%]">
                In each of those seats, I sat across the table from agencies
                presenting dashboards full of numbers that looked good and
                explained nothing, reach that didn't convert, ROAS that didn't
                touch the bank account, reports built to survive a review
                meeting rather than answer the only question that mattered: is
                this working, and how do you know?
              </p>
            </TextReveal>
            <TextReveal>
              <p className="text-[14px] lg:text-[1.11vw] text-[#000000B8] font-haas leading-[120%]">
                That experience is why Uncover exists, and why diagnosis comes
                before spend, not because it's a better sales process, but
                because I spent years on the receiving end of the alternative.
              </p>
            </TextReveal>
          </div>
        </div>
      </LayoutWrapper>
    </div>
  );
}
