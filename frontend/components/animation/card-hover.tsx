"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { defaultRevealTransition } from "@/lib/animation/motion";
import { cn } from "@/lib/utils/cn";

export interface CardHoverProps {
  children: ReactNode;
  className?: string;
}

export function CardHover({ children, className }: CardHoverProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn("will-change-transform", className)}
      whileHover={{
        y: -8,
        scale: 1.01,
      }}
      transition={defaultRevealTransition}
    >
      <motion.div
        whileHover={{
          boxShadow: "var(--shadow-raised)",
          borderColor: "var(--color-border-strong)",
        }}
        transition={defaultRevealTransition}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
