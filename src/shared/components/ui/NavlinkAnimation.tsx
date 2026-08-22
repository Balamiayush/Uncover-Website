import React from "react";

export default function NavlinkAnimation({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <span className="relative block h-[1.2em] overflow-hidden leading-[1.2em]">
      <span
        className="flex flex-col items-center transition-transform duration-500 ease-[cubic-bezier(0.165,0.84,0.44,1)]
          [transform:translateY(0)] 
          [button:hover_&]:-translate-y-[1.2em] 
          [a:hover_&]:-translate-y-[1.2em]"
      >
        <span className="flex h-[1.2em] items-center justify-center ">
          {children}
        </span>

        <span
          className="flex h-[1.2em] items-center justify-center "
          aria-hidden="true"
        >
          {children}
        </span>
      </span>
    </span>
  );
}
