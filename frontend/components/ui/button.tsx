import * as React from "react";

import { cn } from "@/lib/utils/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-primary-foreground hover:bg-brand-600 focus-visible:shadow-focus",
  secondary:
    "border border-border bg-surface text-foreground hover:bg-subtle focus-visible:shadow-focus",
  ghost:
    "bg-transparent text-foreground hover:bg-subtle/80 focus-visible:shadow-focus",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-caption",
  md: "h-11 px-5 text-body",
  lg: "h-12 px-6 text-body-lg",
};

export function getButtonClasses({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}): string {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors outline-none focus-visible:ring-0 disabled:pointer-events-none disabled:opacity-60",
    variantStyles[variant],
    sizeStyles[size],
    className,
  );
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      children,
      type = "button",
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={getButtonClasses({ variant, size, className })}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
