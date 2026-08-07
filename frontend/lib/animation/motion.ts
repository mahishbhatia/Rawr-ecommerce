import type { Transition, Variants } from "framer-motion";

export type RevealPreset =
  | "fade"
  | "slideUp"
  | "slideLeft"
  | "slideRight"
  | "scaleIn";

export interface MotionTiming {
  duration: number;
  ease: [number, number, number, number];
}

export const motionTiming = {
  fast: {
    duration: 0.15,
    ease: [0.16, 1, 0.3, 1],
  },
  base: {
    duration: 0.24,
    ease: [0.16, 1, 0.3, 1],
  },
  slow: {
    duration: 0.32,
    ease: [0.16, 1, 0.3, 1],
  },
} as const satisfies Record<string, MotionTiming>;

export const viewportOnce = {
  once: true,
  amount: 0.2,
} as const;

const hiddenByPreset: Record<RevealPreset, Record<string, number>> = {
  fade: { opacity: 0 },
  slideUp: { opacity: 0, y: 24 },
  slideLeft: { opacity: 0, x: 24 },
  slideRight: { opacity: 0, x: -24 },
  scaleIn: { opacity: 0, scale: 0.96 },
};

export function createRevealVariants(preset: RevealPreset): Variants {
  return {
    hidden: hiddenByPreset[preset],
    visible: { opacity: 1, x: 0, y: 0, scale: 1 },
  };
}

export function createStaggerContainer(stagger = 0.08): Variants {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: 0.04,
      },
    },
  };
}

export const defaultRevealTransition: Transition = {
  ...motionTiming.base,
};
