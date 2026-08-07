import * as React from "react";

import { cn } from "@/lib/utils/cn";

type HeadingElement = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type HeadingSize = "display" | "h1" | "h2" | "h3" | "h4";
type HeadingTone = "default" | "muted";

const sizeStyles: Record<HeadingSize, string> = {
  display: "text-display font-black tracking-tight",
  h1: "text-h1 font-extrabold tracking-tight",
  h2: "text-h2 font-bold tracking-tight",
  h3: "text-h3 font-bold",
  h4: "text-h4 font-semibold",
};

const toneStyles: Record<HeadingTone, string> = {
  default: "text-foreground",
  muted: "text-muted-foreground",
};

const defaultSizeByTag: Record<HeadingElement, HeadingSize> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h4",
  h6: "h4",
};

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: HeadingElement;
  size?: HeadingSize;
  tone?: HeadingTone;
}

export function Heading({
  as = "h2",
  size,
  tone = "default",
  className,
  ...props
}: HeadingProps) {
  const Component = as;
  const resolvedSize = size ?? defaultSizeByTag[as];

  return (
    <Component
      className={cn(sizeStyles[resolvedSize], toneStyles[tone], className)}
      {...props}
    />
  );
}
