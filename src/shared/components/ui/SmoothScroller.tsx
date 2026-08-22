"use client";

import { usePathname } from "next/navigation";
import { type ReactNode, useEffect } from "react";

import { ReactLenis, useLenis } from "lenis/react";

type SmoothScrollerProps = {
  children: ReactNode;
};

export default function SmoothScroller({ children }: SmoothScrollerProps) {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const timeout = setTimeout(() => {
      lenis.scrollTo(0);
      lenis.resize();
    }, 100);

    return () => clearTimeout(timeout);
  }, [pathname, lenis]);

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,
        duration: 1.2,
        wheelMultiplier: 1,
        touchMultiplier: 1,
        infinite: false,
        autoResize: true,
        syncTouch: false,
        prevent: (node) =>
          !!node?.closest?.(
            "[data-lenis-prevent], .mantine-Drawer-root, .mantine-Modal-root",
          ),
      }}
    >
      {children}
    </ReactLenis>
  );
}