import React from "react";
import LayoutWrapper from "../wrapper/LayoutWrapper";
import Image from "next/image";
import Button from "../../ui/button/Button";
import ArrowIcon from "../../icons/ArrowIcon";

export default function MainNavbar() {
  return (
    <header className="w-full absolute z-[100]  top-0 py-[1.15vw] border-b border-white/52  ">
      <LayoutWrapper>
        <nav className="flex justify-between items-center">
          <div className="logo w-[11.55vw] h-auto flex items-center justify-center">
            <Image
              src="/images/uncovericon.svg"
              alt="Uncover Icon"
              width={100}
              height={100}
              className="w-full h-full object-contain"
            />
          </div>
          <div className=" ">
            <Button variant="secondary" className=" ">BOOK A DIAGNOSIS <ArrowIcon className="ml-[0.56vw]" /></Button>
          
          </div>
        </nav>
      </LayoutWrapper>
    </header>
  );
}
