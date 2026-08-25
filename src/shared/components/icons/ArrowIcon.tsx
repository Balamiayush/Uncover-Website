import * as React from "react";

const ArrowIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({
  className = "",
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 14 14"
    strokeWidth="1"
    className={`lg:w-[0.9722vw] lg:h-[0.9722vw] w-3 h-3 shrink-0 ${className}`}
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="square"
      d="M8.166 3.208 11.958 7l-3.792 3.792M11.667 7H2.041"
    />
  </svg>
);

export default ArrowIcon;