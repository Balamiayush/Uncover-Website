"use client";

import { useState, useEffect, useRef } from "react";
import LayoutWrapper from "../wrapper/LayoutWrapper";
import Image from "next/image";
import Button from "../../ui/button/Button";
import ArrowIcon from "../../icons/ArrowIcon";
import Link from "next/link";
import HamburgerMenu from "../../icons/HambuggerMenu";
import CrossIcon from "../../icons/CrossIcon";
import { navLinks } from "@/shared/data/nav-links";
import TextSlide from "../../ui/TextHoverAnim/TextSlide";
import MobileNavbar from "./MobileNavbar";

// GSAP Imports
import gsap from "gsap"; 
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function MainNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  useGSAP(() => {
    const showAnim = gsap.from(headerRef.current, { 
      yPercent: -100,
      paused: true,
      duration: 0.3,
      ease: "power2.out"
    }).progress(1);

    const bgAnim = gsap.fromTo(
      headerRef.current,
      { backgroundColor: "transparent" },
      { 
        backgroundColor: "#1a1a1a",
        paused: true,
        duration: 0.3,
        ease: "power2.out"
      }
    ).progress(0);

    ScrollTrigger.create({
      start: "top top",
      end: "max",
      onUpdate: (self) => {
        // Always keep navbar visible when mobile menu is open
        if (isOpen) {
          showAnim.play();
          return;
        }

        // At the very top, ensure transparent background
        if (self.scroll() <= 10) {
          showAnim.play();
          bgAnim.reverse();
          return;
        }

        // Scrolling down -> hide (-100%), add background when visible
        if (self.direction === 1 && self.scroll() > 50) {
          showAnim.reverse();
          bgAnim.play();
        } else {
          showAnim.play();
          bgAnim.play();
        }
      }
    });
  }, [isOpen]);

  // Lock body & HTML scrolling directly via CSS classes when menu opens
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
      document.documentElement.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
      document.documentElement.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
      document.documentElement.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  return (
    <header
      ref={headerRef}
      data-lenis-prevent
      className={`navbarrr w-full fixed top-0 left-0 z-[99999] py-5 lg:py-[1.15vw] border-b border-white/52 ${
        isOpen ? "bg-black mix-blend-normal " : " "
      }`}
    >
      <LayoutWrapper>
        <nav className="flex justify-between items-center relative z-[100]">
          <Link
            href={"/"}
            className="logo lg:w-[11.55vw] lg:h-auto h-[18px] flex items-center justify-center"
          >
            <Image
              src="/images/uncovericon.svg"
              alt="Uncover Icon"
              width={100}
              height={100}
              className="w-full h-full object-contain"
            />
          </Link>
          <div className="flex gap-[2.7778vw] max-lg:hidden">
            {navLinks.map((link) => (
              <Link
                key={link.id || link.href}
                href={link.href}
                className="text-[1.1111vw] font-haas text-white mix-blend-screen leading-[80%]"
              >
                <TextSlide>{link.label}</TextSlide>
              </Link>
            ))}
          </div>
          <div>
            <Button variant="secondary" className="lg:block hidden">
              BOOK A DIAGNOSIS <ArrowIcon className="ml-[0.56vw]" />
            </Button>
            <button
              onClick={toggleMenu}
              aria-label="Toggle Navigation"
              className="lg:hidden block"
            >
              {isOpen ? (
                <CrossIcon className="lg:hidden block" />
              ) : (
                <HamburgerMenu className="lg:hidden block" />
              )}
            </button>
          </div>
        </nav>
      </LayoutWrapper>
      <MobileNavbar isOpen={isOpen} onClose={closeMenu} />
    </header>
  );
}