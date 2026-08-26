import LayoutWrapper from "../wrapper/LayoutWrapper";
import { SOCIALS } from "@/shared/data/social-links";
import { SITE_LINKS } from "@/shared/data/footer-links";
import { NavItem } from "@/shared/types/navigation";
import ArrowIcon from "../../icons/ArrowIcon";
import TextSlide from "../../ui/TextHoverAnim/TextSlide";
import FooterLogo from "../../icons/FooterLogo";

export interface FooterNavigation {
  socials: NavItem[];
  site: NavItem[];
}

export const FOOTER_NAVIGATION: FooterNavigation = {
  socials: SOCIALS,
  site: SITE_LINKS,
};

export default function Footer() {
  return (
    <div className="pt-16 pb-6 overflow-x-hidden lg:pt-[4.44vw] lg:pb-[2.22vw] bg-black">
      <LayoutWrapper>
        <div className="border border-white/20 grid grid-cols-1 md:grid-cols-3">
          <div className="flex flex-col gap-[5vw] lg:gap-[3vw] p-8 lg:p-[3.33vw] border-b md:border-b-0 md:border-r border-white/20">
            <p className="lg:text-[1.11vw] text-[14px] uppercase text-[#FFD900]">
              SITE
            </p>
            <div className="gap-[1.39vw] flex flex-col items-start">
              {FOOTER_NAVIGATION.site.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="lg:text-[1.11vw] text-[14px]  text-[#fff] font-haas hover:opacity-80 transition-opacity"
                >
                  <TextSlide>
                    <span className="">{item.label}</span>
                  </TextSlide>
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-[5vw] lg:gap-[3vw] p-8 lg:p-[3.33vw] border-b md:border-b-0 md:border-r border-white/20">
            <p className="lg:text-[1.11vw] text-[14px] uppercase text-[#FFD900]">
              SOCIALS
            </p>
            <div className="gap-[1.39vw] flex flex-col items-start">
              {FOOTER_NAVIGATION.socials.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="lg:text-[1.11vw] text-[14px]  text-[#fff] font-haas hover:opacity-80 transition-opacity"
                >
                  <TextSlide>
                    <span className="">{item.label}</span>
                  </TextSlide>
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col  gap-[4.17vw] lg:gap-[5vw] p-8 lg:p-[3.33vw]">
            <p className="lg:text-[1.11vw] text-[14px] uppercase text-[#FFD900]">
              SUBSCRIBE TO NEWSLETTER
            </p>
            <div className="relative border-b border-white pb-2 flex items-center justify-between">
              <input
                type="email"
                placeholder="SEND AN EMAIL"
                className="bg-transparent text-[#fff] lg:text-[1.11vw] text-[14px] uppercase font-mono focus:outline-none w-full placeholder:text-white/60"
              />
              <button
                type="submit"
                aria-label="Submit email"
                className="text-white hover:translate-x-1 transition-transform ml-2"
              >
                <TextSlide>
                  <ArrowIcon />
                </TextSlide>
              </button>
            </div>
          </div>
        </div>
        <div className="logo w-full lg:mt-[3.33vw] mt-[32px]">
          <FooterLogo/>
        </div>
        <div className=" flex w-full justify-between  lg:mt-[3.33vw] mt-[32px] flex-wrap">
          <p className="text-[#FFFFFFB2] text-[12px]  lg:text-[0.97vw] uppercase  leading-0">© 2026 Uncover. All rights reserved.</p>
          <p className="text-[#FFFFFFB2] text-[12px]  lg:text-[0.97vw] uppercase  leading-0">Terms and Conditions</p>
          <p className="text-[#FFFFFFB2] text-[12px]  lg:text-[0.97vw] uppercase  leading-0">Privacy Policy</p>
         
        </div>
      </LayoutWrapper>
    </div>
  );
}
