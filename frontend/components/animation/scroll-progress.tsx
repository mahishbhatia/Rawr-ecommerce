"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

import { designTokens, tokenVar } from "@/lib/design/tokens";

export interface ScrollProgressProps {
  className?: string;
}

export function ScrollProgress({ className }: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();
  const prefersReducedMotion = useReducedMotion();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: prefersReducedMotion ? 1000 : 180,
    damping: prefersReducedMotion ? 1000 : 30,
    mass: prefersReducedMotion ? 1 : 0.2,
  });

  return (
    <motion.div
      aria-hidden="true"
      className={className ?? "fixed inset-x-0 top-0 h-0.5 origin-left bg-primary"}
      style={{
        scaleX,
        zIndex: tokenVar(designTokens.zIndex.tooltip),
      }}
    />
  );
}
