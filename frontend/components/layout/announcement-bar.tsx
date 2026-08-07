import Link from "next/link";

import { cn } from "@/lib/utils/cn";

export interface AnnouncementBarProps {
  message: string;
  ctaLabel?: string;
  ctaHref?: string;
  className?: string;
}

export function AnnouncementBar({
  message,
  ctaLabel,
  ctaHref,
  className,
}: AnnouncementBarProps) {
  return (
    <aside
      className={cn(
        "border-b border-border bg-surface/90 px-4 py-2 text-center text-caption text-muted-foreground",
        className,
      )}
      aria-label="Announcement"
    >
      <span>{message}</span>
      {ctaLabel && ctaHref ? (
        <Link href={ctaHref} className="ml-2 font-semibold text-primary hover:text-brand-400">
          {ctaLabel}
        </Link>
      ) : null}
    </aside>
  );
}
