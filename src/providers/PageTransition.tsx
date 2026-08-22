'use client';

import { useState, useRef } from "react";
import { TransitionRouter } from "next-transition-router";
import { gsap, useGSAP } from "@/lib/gsap";

const COLUMNS = [1, 2, 3, 4, 5, 6];

export default function PageTransition({ children }: { children?: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVerified, setIsVerified] = useState(false);

  // Initial Load Reveal
  useGSAP(() => {
    gsap.timeline({
      onComplete: () => setIsVerified(true)
    })
    .to(".loading-column", {
      yPercent: -100,
      stagger: 0.08,
      duration: 1.4,
      ease: "expo.inOut",
    })
    .set("#loaderContainer", { display: "none" });
  }, { scope: containerRef });

  const handleLeave = (next: () => void) => {
    setIsVerified(false);
    
    gsap.timeline({
      onComplete: () => next() 
    })
    .set("#loaderContainer", { display: "flex" })
    .fromTo(".loading-column", 
      { yPercent: -100 },
      {
        yPercent: 0,
        stagger: 0.06,
        duration: 1.0,
        ease: "expo.inOut",
      }
    );
  };

  const handleEnter = (next: () => void) => {
    window.scrollTo(0, 0);

    gsap.timeline({
      onComplete: () => {
        setIsVerified(true);
        next(); // Complete transition lifecycle
      }
    })
    .to(".loading-column", {
      yPercent: -100,
      stagger: 0.06,
      duration: 1.0,
      ease: "expo.inOut",
    })
    .set("#loaderContainer", { display: "none" });
  };

  return (
    <TransitionRouter leave={handleLeave} enter={handleEnter}>
      <div 
        ref={containerRef} 
        className={isVerified ? "" : "overflow-hidden min-h-screen pointer-events-none"}
      >
        {/* Loader Overlay */}
        <div
          id="loaderContainer"
          className="fixed top-0 left-0 w-full min-h-screen z-[1001] flex items-center justify-center overflow-hidden"
        >
          <div className="absolute inset-0 flex w-full h-full z-0">
            {COLUMNS.map((i) => (
              <div
                key={i}
                className="flex-1 h-full bg-[#550B18] loading-column"
              />
            ))}
          </div>

          {/* <div className="loader-logo relative z-10 flex items-center justify-center">
            <div className="relative scale-[1]">
              <div className="opacity-15">Logo Placeholder</div>

              <div className="absolute inset-0 animate-fill-logo">
                <div>Logo Placeholder</div>
              </div>
            </div>
          </div> */}
        </div>

        {children}
      </div>
    </TransitionRouter>
  );
}