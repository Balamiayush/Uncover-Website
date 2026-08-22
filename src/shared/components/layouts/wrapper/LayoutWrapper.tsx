import type { ReactNode } from "react";

type LayoutWrapperProps = {
  children: ReactNode;
  className?: string;
};

export default function LayoutWrapper({ children, className = "" }: LayoutWrapperProps) {
  return (
    <div className={`px-4 md:px-8 xl:px-[4.44vw] ${className}`}>
      {children}
    </div>
  );
}