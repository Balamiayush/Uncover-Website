import Link from "next/link";
import React, { ReactNode } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import ArrowIcon from "../../icons/ArrowIcon";
import Button from "./Button";
import TextSlide from "../TextHoverAnim/TextSlide";

const startProjectBtnStyles = tv({
  slots: {
    container:
      "relative inline-flex py-2 lg:py-[0.556vw] transition-colors duration-300",
    text: "capitalize font-martian-mono text-[14px] lg:text-[0.972vw] leading-[100%] tracking-[-0.069vw]",
    line: "absolute bottom-0 end-0 h-[1px] lg:h-[0.069vw] w-full",
    arrow: "rotate-360",
  },
  variants: {
    variant: {
      white: {
        text: "text-white",
        line: "bg-white",
        arrow: "text-white",
      },
      black: {
        text: "text-black",
        line: "bg-black",
        arrow: "text-black",
      },
    },
  },
  defaultVariants: {
    variant: "white",
  },
});

export interface StartAProjectBtnProps extends VariantProps<
  typeof startProjectBtnStyles
> {
  className?: string;
  href?: string;
  children?: ReactNode;
}

export default function StartAProjectBtn({
  className = "",
  variant = "white",
  href = "",
  children = "START A PROJECT",
}: StartAProjectBtnProps) {
  const { container, text, line, arrow } = startProjectBtnStyles({ variant });
  const isWhite = variant === "white";

  return (
    <Link href={href} className={container({ className })}>
      <div className="flex gap-6 lg:gap-[2.5vw] items-center">
        <span className={text()}>{children}</span>
        <TextSlide direction="right">
          <ArrowIcon className={arrow()} />
        </TextSlide>
      </div>
      <div className={line()} />
    </Link>
  );
}
