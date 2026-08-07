import { Heading } from "@/components/ui";
import { cn } from "@/lib/utils/cn";

export interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <header className={cn(align === "center" ? "text-center" : "text-left", className)}>
      {eyebrow ? (
        <p className="text-caption font-semibold uppercase tracking-[0.16em] text-primary">
          {eyebrow}
        </p>
      ) : null}
      <Heading as="h2" size="h2" className="mt-3 max-w-3xl">
        {title}
      </Heading>
      {description ? (
        <p
          className={cn(
            "mt-4 max-w-2xl text-body text-muted-foreground",
            align === "center" ? "mx-auto" : "",
          )}
        >
          {description}
        </p>
      ) : null}
    </header>
  );
}
