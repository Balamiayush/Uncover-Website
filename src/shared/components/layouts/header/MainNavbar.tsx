import React from "react";
import LayoutWrapper from "../wrapper/LayoutWrapper";
import Image from "next/image";
import Button from "../../ui/button/Button";
import ArrowIcon from "../../icons/ArrowIcon";
import Link from "next/link";

export default function MainNavbar() {
  return (
    <header className="w-full absolute z-[100]  top-0 py-5 lg:py-[1.15vw] border-b border-white/52  ">
      <LayoutWrapper>
        <nav className="flex justify-between items-center">
          <Link href={'/'} className="logo lg:w-[11.55vw] lg:h-auto h-[18px] flex items-center justify-center">
            <Image
              src="/images/uncovericon.svg"
              alt="Uncover Icon"
              width={100}
              height={100}
              className="w-full h-full object-contain"
            />
          </Link>
          <div className=" ">
            <Button variant="secondary" className=" lg:block hidden ">BOOK A DIAGNOSIS <ArrowIcon className="ml-[0.56vw]" /></Button>
          
          </div>
        </nav>
      </LayoutWrapper>
    </header>
  );
}
