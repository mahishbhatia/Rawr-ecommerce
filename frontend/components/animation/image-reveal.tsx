"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { defaultRevealTransition } from "@/lib/animation/motion";
import { cn } from "@/lib/utils/cn";

export interface ImageRevealProps {
  children: ReactNode;
  className?: string;
}

export function ImageReveal({ children, className }: ImageRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn("overflow-hidden", className)}
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      whileInView={{ clipPath: "inset(0 0 0% 0)" }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ ...defaultRevealTransition, duration: 0.5 }}
    >
      <motion.div
        initial={{ scale: 1.08 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ ...defaultRevealTransition, duration: 0.7 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
