"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { createStaggerContainer, defaultRevealTransition } from "@/lib/animation/motion";

export interface HeroRevealProps {
  children: ReactNode;
  className?: string;
}

export function HeroReveal({ children, className }: HeroRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={createStaggerContainer(0.09)}
      transition={defaultRevealTransition}
    >
      {children}
    </motion.div>
  );
}
