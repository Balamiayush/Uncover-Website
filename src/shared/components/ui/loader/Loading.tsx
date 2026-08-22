"use client";

import React, { useState, useEffect } from "react";
import FooterLogo from "@/shared/components/icons/FooterLogo";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import Image from "next/image";
import LeafButton from "@/shared/components/ui/button/Button";

export default function Loading() {
  const [isVerified, setIsVerified] = useState<boolean | null>(null);
  const columns = [1, 2, 3, 4, 5, 6];

  useEffect(() => {
    const verified = sessionStorage.getItem("isAgeVerified");
    if (verified === "true") {
      setIsVerified(true);
    } else {
      setIsVerified(false);
    }
  }, []);

  useEffect(() => {
    if (isVerified === false) {
      document.body.style.overflow = "hidden";
    } else if (isVerified === true) {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isVerified]);

  useGSAP(() => {
    if (isVerified !== false) return;
    
    const tl = gsap.timeline();

    tl.to(".loader-logo", {
      opacity: 0,
      duration: 0.4,
      delay: 1.2,
      ease: "power4.inOut",
    })
      .to(".loading-column", {
        yPercent: -100,
        stagger: 0.1,
        duration: 2.5,
        ease: "expo.inOut",
      })
      .to("#loaderContainer", {
        display: "none",
        duration: 0,
      });
  }, [isVerified]);

  const handleLegalAge = () => {
    gsap.to("#ageGateModal", {
      yPercent: -100,
      duration: 0.8,
      ease: "power4.inOut",
      onComplete: () => {
        sessionStorage.setItem("isAgeVerified", "true");
        setIsVerified(true);
      },
    });
  };

  const handleUnderAge = () => {
    window.location.href = "https://www.google.com";
  };

  if (isVerified === null || isVerified === true) return null;

  return (
    <>
      <div
        id="loaderContainer"
        className="fixed top-0 left-0 w-full h-screen z-[1001] flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 flex w-full h-full z-0">
          {columns.map((i) => (
            <div
              key={i}
              className="flex-1 h-full bg-[#550B18] loading-column"
            />
          ))}
        </div>

        <div className="loader-logo relative z-10 flex items-center justify-center">
          <div className="relative scale-[1]">
            <FooterLogo className="opacity-15" />

            <div className="absolute inset-0 animate-fill-logo">
              <FooterLogo className="" />
            </div>
          </div>
        </div>
      </div>

      <div
        id="ageGateModal"
        className="fixed top-0 left-0 w-full h-screen bg-[#F8F4EB] z-[1000] flex flex-col justify-between overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none flex justify-between items-end z-0">
          <div className="relative w-[18.438vw] h-[37.604vw] -ml-[1vw]">
            <Image
              src="https://res.cloudinary.com/dfajjqglx/image/upload/v1784701821/Group_4006_pjpnry.svg"
              alt=""
              fill
              className="w-full h-full object-contain object-left-bottom"
            />
          </div>

          <div className="relative w-[18.438vw] h-[37.604vw]">
            <Image
              src="https://res.cloudinary.com/dfajjqglx/image/upload/v1784701820/right_h4hxdu.svg"
              alt=""
              fill
              className="w-full h-full object-contain object-right-bottom"
            />
          </div>
        </div>

        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center ">
          <div className="flex flex-col items-center  ">
            <div className="flex items-center justify-center mb-[3.333vw]">
              <FooterLogo className="w-[8vw] h-auto" />
            </div>

            <h1 className="text-[3.125vw] font-dinamic leading-[105%] text-center">
              WELCOME TO NEPAL'S HOME <br />
              OF FINE SPIRITS
            </h1>

            <div className="mt-[2.083vw] flex items-center justify-center gap-[12px]">
              <LeafButton onClick={handleLegalAge}>
                I'M OF LEGAL DRINKING AGE
              </LeafButton>
              <LeafButton
                variant="tertiary"
                roundedSide="right"
                onClick={handleUnderAge}
              >
                I'M NOT OF LEGAL AGE
              </LeafButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}