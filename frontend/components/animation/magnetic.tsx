"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useReducedMotion } from "framer-motion";

export interface MagneticProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

export function Magnetic({ children, className, strength = 0.3 }: MagneticProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const element = rootRef.current;
    if (!element || prefersReducedMotion) {
      return;
    }

    const moveX = gsap.quickTo(element, "x", {
      duration: 0.45,
      ease: "power3.out",
    });
    const moveY = gsap.quickTo(element, "y", {
      duration: 0.45,
      ease: "power3.out",
    });

    const onMove = (event: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      moveX(x * strength);
      moveY(y * strength);
    };

    const onLeave = () => {
      moveX(0);
      moveY(0);
    };

    element.addEventListener("mousemove", onMove);
    element.addEventListener("mouseleave", onLeave);

    return () => {
      element.removeEventListener("mousemove", onMove);
      element.removeEventListener("mouseleave", onLeave);
      gsap.killTweensOf(element);
    };
  }, [prefersReducedMotion, strength]);

  return (
    <div ref={rootRef} className={className}>
      {children}
    </div>
  );
}
