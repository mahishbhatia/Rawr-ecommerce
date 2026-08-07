import * as React from "react";

import { cn } from "@/lib/utils/cn";

type ContainerWidth = "narrow" | "content" | "wide" | "full";

const widthStyles: Record<ContainerWidth, string> = {
  narrow: "max-w-3xl",
  content: "max-w-5xl",
  wide: "max-w-7xl",
  full: "max-w-none",
};

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: ContainerWidth;
}

export function Container({
  className,
  width = "wide",
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8", widthStyles[width], className)}
      {...props}
    />
  );
}
