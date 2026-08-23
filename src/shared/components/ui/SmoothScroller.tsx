"use client";

import { ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis, useLenis } from "lenis/react";

type SmoothScrollerProps = {
  children: ReactNode;
};

export default function SmoothScroller({
  children,
}: SmoothScrollerProps) {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    // Reset scroll position when route changes
    lenis.scrollTo(0, {
      immediate: true,
    });

    // Recalculate page dimensions
    lenis.resize();
  }, [pathname, lenis]);

  return (
    <ReactLenis
      root
      options={{
        // Premium / buttery smooth scrolling
        lerp: 0.065,
        duration: 1.3,

        // Scroll speed
        wheelMultiplier: 0.85,
        touchMultiplier: 1,

        // Normal website scrolling
        infinite: false,

        // Automatically recalculate scroll dimensions
        autoResize: true,

        // Better control on touch devices
        syncTouch: false,

        // Allow nested UI components to handle their own scrolling
        prevent: (node) =>
          !!node?.closest?.(
            [
              "[data-lenis-prevent]",
              ".mantine-Drawer-root",
              ".mantine-Modal-root",
              "[data-scroll-container]",
            ].join(", "),
          ),
      }}
    >
      {children}
    </ReactLenis>
  );
}