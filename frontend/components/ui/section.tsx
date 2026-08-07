import * as React from "react";

import { cn } from "@/lib/utils/cn";

type SectionSpacing = "sm" | "md" | "lg";
type SectionTone = "transparent" | "surface" | "subtle";

const spacingStyles: Record<SectionSpacing, string> = {
  sm: "py-8 md:py-12",
  md: "py-12 md:py-16",
  lg: "py-16 md:py-24",
};

const toneStyles: Record<SectionTone, string> = {
  transparent: "bg-transparent",
  surface: "bg-surface",
  subtle: "bg-subtle",
};

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  spacing?: SectionSpacing;
  tone?: SectionTone;
}

export function Section({
  className,
  spacing = "md",
  tone = "transparent",
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(spacingStyles[spacing], toneStyles[tone], className)}
      {...props}
    />
  );
}
