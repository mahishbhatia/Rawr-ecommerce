"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Transition } from "framer-motion";

import {
  createRevealVariants,
  createStaggerContainer,
  defaultRevealTransition,
  type RevealPreset,
  viewportOnce,
} from "@/lib/animation/motion";

export interface StaggerGroupProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  once?: boolean;
}

export function StaggerGroup({
  children,
  className,
  stagger = 0.08,
  once = true,
}: StaggerGroupProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={once ? viewportOnce : { amount: 0.2, once: false }}
      variants={createStaggerContainer(stagger)}
    >
      {children}
    </motion.div>
  );
}

export interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  preset?: RevealPreset;
  transition?: Transition;
}

export function StaggerItem({
  children,
  className,
  preset = "slideUp",
  transition,
}: StaggerItemProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={createRevealVariants(preset)}
      transition={{ ...defaultRevealTransition, ...transition }}
    >
      {children}
    </motion.div>
  );
}
