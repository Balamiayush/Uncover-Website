import ArrowIcon from "@/shared/components/icons/ArrowIcon";
import LayoutWrapper from "@/shared/components/layouts/wrapper/LayoutWrapper";

import TextSlide from "@/shared/components/ui/TextHoverAnim/TextSlide";

export default function HeroSection() {
  return (
    <div className="h-screen  w-full relative  text-white pt-[130px] lg:pt-[9.028vw] pb-[52px] lg:pb-[2vw] bg-[url('/images/hero-section-img/hero-section-bg-v1.webp')]  bg-cover bg-center bg-no-repeat  ">
      <LayoutWrapper className=" w-full relative z-10 flex flex-col h-full justify-between">
        <div className="">
          <h1 className="text-[40px] lg:text-[5vw] xl:text-[5vw] leading-[100%] lg:leading-[80%] tracking-[-3px] lg:tracking-[-0.208vw] max-w-[358px] lg:max-w-[47.222vw]">
            Every outcome has variables. We uncover what’s holding you back.
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 w-full lg:items-end items-center mt-[48px] lg:mt-[4.0278vw] ">
          <div className="lg:flex hidden justify-start">
            <div className="w-[40px] h-[40px]  lg:w-[2.778vw] lg:h-[2.778vw] border rounded-full flex items-center justify-center cursor-pointer">
              <TextSlide>
                <ArrowIcon className="rotate-90 " />
              </TextSlide>
            </div>
          </div>

          <div className="flex justify-center max-lg:gap-[48px] flex-col items-center">
            <p className="lg:max-w-[19.86vw] max-w-[286px] text-center lg:text-[1.25vw] text-[18px] text-white leading-[110%] font-normal">
              Most businesses find out the problem, after the budget is already
              gone.
            </p>
          </div>

          <div className=" hidden lg:flex justify-end  ">
            <div className="flex h-[115px] lg:h-[7.986vw] items-center gap-[0.56vw]">
              <div className="w-[115px] lg:w-[7.986vw] h-full bg-blue-500 rounded-sm overflow-hidden flex-shrink-0">
                {/* Place your image here */}
              </div>
              <div className="w-[238px] lg:w-[16.528vw] h-full bg-white text-black p-[1.111vw] flex flex-col justify-between flex-shrink-0 rounded-sm">
                <div className="flex items-center justify-between">
                  <p className="text-[18px] lg:text-[1.25vw] font-medium leading-[80%]">
                    New Case Study
                  </p>
                  <TextSlide>
                    <ArrowIcon className="" />
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
