"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";

import { Logo } from "@/components/branding/logo";
import { NavigationLink } from "@/components/navigation/navigation-link";
import { Container } from "@/components/ui";
import { primaryNavItems } from "@/lib/constants/navigation";
import { designTokens, tokenVar } from "@/lib/design/tokens";
import { cn } from "@/lib/utils/cn";

const MobileNavDrawer = dynamic(
  () =>
    import("./mobile-nav-drawer").then((mod) => ({
      default: mod.MobileNavDrawer,
    })),
  { ssr: false },
);

function MenuButton({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={isOpen}
      aria-controls="mobile-navigation-drawer"
      aria-label={isOpen ? "Close menu" : "Open menu"}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/65 text-foreground backdrop-blur md:hidden"
    >
      <span className="relative block h-4 w-5">
        <span
          className={cn(
            "absolute left-0 top-0 block h-0.5 w-5 bg-foreground transition-all",
            isOpen ? "top-[7px] rotate-45" : "",
          )}
        />
        <span
          className={cn(
            "absolute left-0 top-[7px] block h-0.5 w-5 bg-foreground transition-opacity",
            isOpen ? "opacity-0" : "opacity-100",
          )}
        />
        <span
          className={cn(
            "absolute bottom-0 left-0 block h-0.5 w-5 bg-foreground transition-all",
            isOpen ? "bottom-[7px] -rotate-45" : "",
          )}
        />
      </span>
    </button>
  );
}

export function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    let previousY = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - previousY;

      setIsScrolled(currentY > 8);

      if (isMobileOpen) {
        setIsHidden(false);
        previousY = currentY;
        return;
      }

      if (currentY <= 16) {
        setIsHidden(false);
      } else if (delta > 6) {
        setIsHidden(true);
      } else if (delta < -6) {
        setIsHidden(false);
      }

      previousY = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMobileOpen]);

  const desktopNav = useMemo(
    () =>
      primaryNavItems.map((item) => (
        <NavigationLink
          key={item.href}
          href={item.href}
          label={item.label}
          variant="desktop"
        />
      )),
    [],
  );

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 transition-transform",
          isHidden ? "-translate-y-full" : "translate-y-0",
        )}
        style={{
          zIndex: tokenVar(designTokens.zIndex.sticky),
          transitionDuration: tokenVar(designTokens.duration.base),
          transitionTimingFunction: "var(--ease-emphasized)",
        }}
      >
        <Container className="pt-3">
          <div
            className={cn(
              "rounded-full border transition-all",
              isScrolled
                ? "border-border/80 bg-surface/72 shadow-soft backdrop-blur-xl"
                : "border-border/0 bg-background/10 backdrop-blur-sm",
            )}
          >
            <div className="flex h-14 items-center justify-between px-4 sm:px-5">
              <Logo size="sm" className="-mb-0.5 pr-2" />

              <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
                {desktopNav}
              </nav>

              <MenuButton
                isOpen={isMobileOpen}
                onClick={() => setIsMobileOpen((current) => !current)}
              />
            </div>
          </div>
        </Container>
      </header>

      <MobileNavDrawer
        isOpen={isMobileOpen}
        navItems={primaryNavItems}
        onClose={() => setIsMobileOpen(false)}
      />
    </>
  );
}
