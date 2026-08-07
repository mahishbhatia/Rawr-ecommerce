"use client";

import type { ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { defaultRevealTransition } from "@/lib/animation/motion";

export interface LoadingWrapperProps {
  isLoading: boolean;
  children: ReactNode;
  fallback?: ReactNode;
  className?: string;
}

export function LoadingWrapper({
  isLoading,
  children,
  fallback,
  className,
}: LoadingWrapperProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div className={className}>
        {isLoading ? fallback : children}
      </div>
    );
  }

  return (
    <div className={className}>
      <AnimatePresence mode="wait" initial={false}>
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={defaultRevealTransition}
          >
            {fallback}
          </motion.div>
        ) : (
          <motion.div
            key="loaded"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={defaultRevealTransition}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
