import Link from "next/link";

import { cn } from "@/lib/utils/cn";

type LogoSize = "sm" | "md";

const sizeStyles: Record<LogoSize, string> = {
  sm: "text-h4",
  md: "text-h2",
};

export interface LogoProps {
  className?: string;
  size?: LogoSize;
  showTagline?: boolean;
}

export function Logo({ className, size = "md", showTagline = false }: LogoProps) {
  return (
    <Link href="/" className={cn("inline-flex flex-col justify-center gap-0.5", className)}>
      <span className="inline-flex items-center gap-2">
        <span
          aria-hidden="true"
          className="inline-block h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_14px_rgba(241,90,36,0.65)]"
        />
        <span
          className={cn(
            "font-black tracking-[0.2em] text-primary drop-shadow-[0_7px_18px_rgba(241,90,36,0.28)]",
            sizeStyles[size],
          )}
        >
          RAWR
        </span>
      </span>
      {showTagline ? (
        <span className="pl-3.5 text-caption font-medium uppercase tracking-[0.11em] text-muted-foreground">
          As Raw As You.
        </span>
      ) : null}
    </Link>
  );
}
