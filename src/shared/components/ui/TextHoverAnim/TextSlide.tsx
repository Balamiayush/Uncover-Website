import React, { ReactNode } from "react";

export interface TextSlideProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
}

export default function TextSlide({
  children,
  direction = "up",
  className = "",
}: TextSlideProps) {
  const isVertical = direction === "up" || direction === "down";

  const directionClasses = {
    up: "[button:hover_&]:-translate-y-[1.2em] [a:hover_&]:-translate-y-[1.2em]",
    down: "translate-y-[-1.2em] [button:hover_&]:translate-y-0 [a:hover_&]:translate-y-0",
    left: "[button:hover_&]:-translate-x-full [a:hover_&]:-translate-x-full",
    right: "-translate-x-full [button:hover_&]:translate-x-0 [a:hover_&]:translate-x-0",
  };

  return (
    <span
      className={`relative block h-[1.2em] overflow-hidden leading-[1.2em] ${className}`}
    >
      <span
        className={`
          flex ${isVertical ? "flex-col items-center" : "flex-row"}
          transition-transform duration-500
          ease-[cubic-bezier(0.165,0.84,0.44,1)]
          ${directionClasses[direction]}
        `}
      >
        <span className="flex h-[1.2em] min-w-full shrink-0 items-center justify-center">
          {children}
        </span>

        <span
          aria-hidden
          className="flex h-[1.2em] min-w-full shrink-0 items-center justify-center"
        >
          {children}
        </span>
      </span>
    </span>
  );
}