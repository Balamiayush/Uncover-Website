import React from "react";
import LayoutWrapper from "../wrapper/LayoutWrapper";
import Image from "next/image";
import Button from "../../ui/button/Button";

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
          <div className=" flex gap-[0.56vw] items-center">
            <Button>BOOK A DIAGNOSIS</Button>
            <Button className="" variant="secondary">
              Menu
              <div className="ml-2 flex flex-col gap-1 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="12"
                  fill="none"
                  viewBox="0 0 16 12"
                >
                  <path
                    stroke="#fff"
                    strokeLinecap="square"
                    d="M1.667 3.75h12.666M1.666 8.25h12.667"
                  ></path>
                </svg>
              </div>
            </Button>
          </div>
        </nav>
      </LayoutWrapper>
    </header>
  );
}
