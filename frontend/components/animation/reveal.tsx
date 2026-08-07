"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Transition } from "framer-motion";

import {
  createRevealVariants,
  defaultRevealTransition,
  type RevealPreset,
  viewportOnce,
} from "@/lib/animation/motion";
import { cn } from "@/lib/utils/cn";

export interface RevealProps {
  children: ReactNode;
  className?: string;
  preset?: RevealPreset;
  delay?: number;
  transition?: Transition;
  once?: boolean;
}

export function Reveal({
  children,
  className,
  preset = "fade",
  delay = 0,
  transition,
  once = true,
}: RevealProps) {
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
      variants={createRevealVariants(preset)}
      transition={{ ...defaultRevealTransition, ...transition, delay }}
    >
      {children}
    </motion.div>
  );
}

export function FadeIn(props: Omit<RevealProps, "preset">) {
  return <Reveal preset="fade" {...props} />;
}

export function SlideUp(props: Omit<RevealProps, "preset">) {
  return <Reveal preset="slideUp" {...props} />;
}

export function SlideLeft(props: Omit<RevealProps, "preset">) {
  return <Reveal preset="slideLeft" {...props} />;
}

export function SlideRight(props: Omit<RevealProps, "preset">) {
  return <Reveal preset="slideRight" {...props} />;
}

export function ScaleIn(props: Omit<RevealProps, "preset">) {
  return <Reveal preset="scaleIn" {...props} />;
}

export interface HoverLiftProps {
  children: ReactNode;
  className?: string;
  distance?: number;
}

export function HoverLift({ children, className, distance = 6 }: HoverLiftProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn("will-change-transform", className)}
      whileHover={{ y: -distance }}
      transition={defaultRevealTransition}
    >
      {children}
    </motion.div>
  );
}
