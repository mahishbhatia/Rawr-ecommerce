"use client";

import type { ReactNode } from "react";

import { Reveal, type RevealProps } from "@/components/animation/reveal";

export interface ScrollRevealProps extends Omit<RevealProps, "preset"> {
  children: ReactNode;
}

export function ScrollReveal({ children, ...props }: ScrollRevealProps) {
  return (
    <Reveal preset="slideUp" {...props}>
      {children}
    </Reveal>
  );
}
