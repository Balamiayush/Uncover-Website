import ArrowIcon from "@/shared/components/icons/ArrowIcon";
import LayoutWrapper from "@/shared/components/layouts/wrapper/LayoutWrapper";
import Button from "@/shared/components/ui/button/Button";

import TextSlide from "@/shared/components/ui/TextHoverAnim/TextSlide";
import Image from "next/image";

export default function HeroSection() {
  return (
    <div className="min-h-screen w-full relative bg-black text-white pt-[130px] lg:pt-[9.028vw] pb-8 lg:pb-[3.33vw] flex flex-col justify-between">
      <LayoutWrapper className="flex flex-col justify-between flex-1 w-full">
        <div className="w-full">
          <h1 className="text-[44px] lg:text-[5vw] xl:text-[5vw] leading-[80%] tracking-[-3px] lg:tracking-[-0.208vw] max-w-[358px] lg:max-w-[47.222vw]">
            Every outcome has variables. We uncover what’s holding you back.
          </h1>
        </div>

        <div className="relative w-full flex justify-center items-center my-auto py-6">
          <div className="w-[12vw] h-[12vw] relative">
            {/* Example: <Image src="/images/hero-u-logo.png" fill alt="U Logo" className="object-contain" /> */}
          </div>
        </div>

        <div className="grid grid-cols-3 w-full items-end">
          <div className="flex justify-start">
            <Button
              variant="secondary"
              isIconOnly
              direction="down"
              className="w-[2.778vw] h-[2.778vw]"
            >
              <ArrowIcon className="rotate-90" />
            </Button>
          </div>

          {/* Center: Subtitle Text */}
          <div className="flex justify-center">
            <p className="lg:max-w-[19.86vw] max-w-[20.208vw] text-center lg:text-[1.25vw] text-[0.972vw] text-white leading-[110%] font-normal">
              Most businesses find out the problem, after the budget is already
              gone.
            </p>
          </div>

          <div className="flex justify-end  ">
            <div className="flex h-[115px] lg:h-[7.986vw] items-center gap-[0.56vw]">
              <div className="w-[115px] lg:w-[7.986vw] h-full bg-blue-500 rounded-l-sm overflow-hidden flex-shrink-0">
                {/* Place your image here */}
              </div>

              <div className="w-[238px] lg:w-[16.528vw] h-full bg-white text-black p-[1.111vw] flex flex-col justify-between flex-shrink-0 rounded-r-sm">
                <div className="flex items-center justify-between">
                  <p className="text-[18px] lg:text-[1.25vw] font-medium leading-[80%]">
                    New Case Study
                  </p>
                  <TextSlide>
                    <ArrowIcon className="rotate-180 w-4 h-4 lg:w-[1.111vw] lg:h-[1.111vw]" />
                  </TextSlide>
                </div>

                <div className="flex flex-col gap-[0.278vw]">
                  <p className="text-[16px] lg:text-[1.111vw] font-medium leading-[100%]">
                    Marketing
                  </p>
                  <p className="text-[16px] lg:text-[1.111vw] leading-[100%] text-black/70">
                    Web Design, 3D & Development
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutWrapper>
    </div>
  );
}
