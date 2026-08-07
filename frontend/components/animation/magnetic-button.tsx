"use client";

import type { ReactNode } from "react";

import { Magnetic } from "@/components/animation/magnetic";

export interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

export function MagneticButton({
  children,
  className,
  strength,
}: MagneticButtonProps) {
  return (
    <Magnetic className={className} strength={strength}>
      {children}
    </Magnetic>
  );
}
