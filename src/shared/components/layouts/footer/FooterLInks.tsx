import React from "react";
import Link from "next/link";
import NavlinkAnimation from "../../ui/NavlinkAnimation";

export default function FooterLinks() {
  const exploreLinks = [
    { label: "Home", href: "/" },
    { label: "Company", href: "/company" },
    { label: "Brand", href: "/brand" },
    { label: "Heritage", href: "/heritage" },
    { label: "Leadership", href: "/leadership" },
    { label: "Careers", href: "/careers" },
    { label: "News", href: "/news" },
  ];

  const socialLinks = [
    { label: "Facebook", href: "https://facebook.com" },
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Linkedin", href: "https://linkedin.com" },
    { label: "Youtube", href: "https://youtube.com" },
  ];

  return (
    <div className="flex  gap-[10.417vw]">
      <div className="flex flex-col gap-[24px] w-fit items-start">
        <h3 className="text-[#00000066] text-[16px] font-medium uppercase">
          Explore
        </h3>
        <ul className="flex flex-col gap-[20px] items-start">
          {exploreLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="text-[#000000B2] text-[16px] font-normal transition-colors duration-200"
              >
                <NavlinkAnimation>{link.label}</NavlinkAnimation>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-[50px] w-fit items-start ">
        <div className="flex flex-col gap-[24px]">
          <h3 className="text-[#00000066] text-[16px] font-medium uppercase">
            Contact
          </h3>
          <ul className="flex flex-col gap-[20px] items-start">
            <li>
              <a
                href="mailto:hello@ndpl.com"
                className="text-[#000000B2] text-[16px] font-normal transition-colors"
              >
                <NavlinkAnimation>hello@ndpl.com</NavlinkAnimation>
              </a>
            </li>
            <li>
              <a
                href="tel:+9779817271182"
                className="text-[#000000B2] text-[16px] font-normal  transition-colors"
              >
                <NavlinkAnimation>+977 9817271182</NavlinkAnimation>
              </a>
            </li>
            <li>
              <a
                href="tel:+9779817918282"
                className="text-[#000000B2] text-[16px] font-normal transition-colors"
              >
                <NavlinkAnimation>+977 9817918282</NavlinkAnimation>
              </a>
            </li>
          </ul>
        </div>

        {/* Address Group */}
        <div className="flex flex-col gap-[24px] ">
          <h3 className="text-[#00000066] text-[16px] font-medium uppercase">
            
            Address
          </h3>
          <div className="flex flex-col gap-[20px]  text-[16px] font-normal items-start">
            <a href="" className="text-[#000000B2]!">
              <NavlinkAnimation>
              Bellford street 21, NYC
              </NavlinkAnimation>
            </a>

            <a href="" className="text-[#000000B2]!">
              <NavlinkAnimation>
              Kathmandu, Nepal
              </NavlinkAnimation>
            </a>
          </div>
        </div>
      </div>

      {/* COLUMN 3: SOCIALS */}
      <div className="flex flex-col gap-[24px] w-fit items-start ">
        <h3 className="text-[#00000066] text-[16px] font-medium uppercase">
          Socials
        </h3>
        <ul className="flex flex-col gap-[20px] items-start">
          {socialLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#000000B2] text-[16px] font-normal! transition-colors duration-200"
              >
                <NavlinkAnimation>{link.label}</NavlinkAnimation>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}