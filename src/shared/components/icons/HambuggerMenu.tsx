import * as React from "react";

const HamburgerMenu: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="#fff"
      strokeLinecap="square"
      strokeWidth="1.499"
      d="M2.75 12h18.5M2.75 5.75h18.5m-18.5 12.5h18.5"
    ></path>
  </svg>
);

export default HamburgerMenu;