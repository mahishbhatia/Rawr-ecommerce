"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils/cn";
import { isActiveRoute } from "@/lib/utils/routing";

type NavigationLinkVariant = "desktop" | "mobile" | "footer";

const variantStyles: Record<NavigationLinkVariant, string> = {
  desktop:
    "rounded-sm px-1 py-1 text-caption font-medium uppercase tracking-[0.1em] transition-colors hover:text-foreground",
  mobile:
    "block rounded-sm py-2 text-body-lg font-semibold tracking-wide transition-colors hover:text-foreground",
  footer: "text-caption text-muted-foreground transition-colors hover:text-foreground",
};

const activeStyles: Record<NavigationLinkVariant, string> = {
  desktop:
    "text-foreground after:absolute after:-bottom-1 after:left-0 after:block after:h-px after:w-full after:bg-primary",
  mobile: "text-foreground",
  footer: "text-foreground",
};

export interface NavigationLinkProps {
  href: string;
  label: string;
  className?: string;
  variant?: NavigationLinkVariant;
  onNavigate?: () => void;
}

export function NavigationLink({
  href,
  label,
  className,
  variant = "desktop",
  onNavigate,
}: NavigationLinkProps) {
  const pathname = usePathname();
  const isActive = isActiveRoute(pathname, href);

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "relative text-muted-foreground",
        variantStyles[variant],
        isActive && activeStyles[variant],
        className,
      )}
      onClick={onNavigate}
    >
      {label}
    </Link>
  );
}
