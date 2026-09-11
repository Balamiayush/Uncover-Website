import * as React from "react";

const CrossIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({
  className = "",
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    fill="none"
    viewBox="0 0 18 18"
    {...props}
  >
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeWidth="2"
      d="M17 17 1 1m16 0L1 17"
    ></path>
  </svg>
);

export default CrossIcon;