"use client";

import type { ReactNode } from "react";
import { Fragment } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { defaultRevealTransition } from "@/lib/animation/motion";

export interface TextRevealProps {
  text: string;
  className?: string;
}

export function TextReveal({ text, className }: TextRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <span className={className}>{text}</span>;
  }

  const words = text.split(" ");

  return (
    <span className={className}>
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <motion.span
            className="inline-block will-change-transform"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              ...defaultRevealTransition,
              delay: index * 0.04,
            }}
          >
            {word}
          </motion.span>
          {index < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </span>
  );
}

export interface CharacterRevealProps {
  children: ReactNode;
  className?: string;
}

export function CharacterReveal({ children, className }: CharacterRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <span className={className}>{children}</span>;
  }

  const content = String(children);

  return (
    <span className={className}>
      {content.split("").map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          className="inline-block will-change-transform"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{
            ...defaultRevealTransition,
            delay: index * 0.018,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}
