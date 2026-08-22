import * as React from "react";

const ArrowIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    fill="none"
    viewBox="0 0 14 14"
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