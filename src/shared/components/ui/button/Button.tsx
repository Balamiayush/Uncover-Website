import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import TextSlide from "../TextHoverAnim/TextSlide";
import { TextSlideProps } from "../TextHoverAnim/TextSlide";

const buttonStyles = tv({
  base: [
    "relative inline-flex items-center justify-center overflow-hidden",
    "uppercase cursor-pointer select-none z-10 ",
    "transition-all duration-500 active:scale-[0.98]",
    "ease-[cubic-bezier(0.165,0.84,0.44,1)]",

    "after:absolute after:inset-0 after:content-[''] after:-z-10",
    "after:rounded-[inherit]",
    "after:transition-transform after:duration-500",
    "after:ease-[cubic-bezier(0.165,0.84,0.44,1)]",
    "hover:after:scale-[0.97]",
  ],

  variants: {
    variant: {
      primary: "bg-white text-black after:bg-white hover:bg-neutral-100",

      secondary:
        "bg-transparent text-white border border-white after:bg-white/5 hover:border-white/60",

      tertiary:
        "bg-white/10 text-white border border-white/10 after:bg-white/10 hover:bg-white/20",
    },

    roundedSide: {
      full: "rounded-full",
    },

    size: {
      fixed: "h-[2.778vw] px-[1.25vw] py-[0.833vw] text-[0.972vw]",
      sm: "px-[0.833vw] py-[0.417vw] text-[0.833vw]",
      md: "px-[1.111vw] py-[0.556vw] text-[0.972vw]",
      lg: "px-[1.667vw] py-[0.833vw] text-[1.111vw]",
    },

    isIconOnly: {
      true: "p-0",
      false: "",
    },
  },

  compoundVariants: [
    {
      size: "fixed",
      isIconOnly: true,
      className: "h-[2.778vw] px-0 py-0",
    },
  ],

  defaultVariants: {
    variant: "primary",
    roundedSide: "full",
    size: "fixed",
    isIconOnly: false,
  },
});

type ButtonVariants = VariantProps<typeof buttonStyles>;

export interface ButtonProps
  extends ComponentPropsWithoutRef<"button">,
    ButtonVariants {
  children: ReactNode;
  direction?: TextSlideProps["direction"];
}

export default function Button({
  children,
  variant,
  roundedSide,
  size,
  isIconOnly,
  className,
  direction = "up",
  ...props
}: ButtonProps) {
  return (
    <button
      className={buttonStyles({
        variant,
        roundedSide,
        size,
        isIconOnly,
        className,
      })}
      {...props}
    >
      <TextSlide direction={direction}>{children}</TextSlide>
    </button>
  );
}