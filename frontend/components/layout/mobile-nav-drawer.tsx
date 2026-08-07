"use client";

import { useEffect, useMemo, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Logo } from "@/components/branding/logo";
import { NavigationLink } from "@/components/navigation/navigation-link";
import { Button } from "@/components/ui";
import { useFocusTrap } from "@/hooks/use-focus-trap";
import type { NavItem } from "@/lib/constants/navigation";
import { designTokens, tokenVar } from "@/lib/design/tokens";
import { cn } from "@/lib/utils/cn";

export interface MobileNavDrawerProps {
  isOpen: boolean;
  navItems: readonly NavItem[];
  onClose: () => void;
}

export function MobileNavDrawer({
  isOpen,
  navItems,
  onClose,
}: MobileNavDrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  useFocusTrap(panelRef.current, isOpen, onClose);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  const navLinks = useMemo(
    () =>
      navItems.map((item) => (
        <NavigationLink
          key={item.href}
          href={item.href}
          label={item.label}
          variant="mobile"
          onNavigate={onClose}
        />
      )),
    [navItems, onClose],
  );

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 bg-neutral-900/45 backdrop-blur-md md:hidden"
          style={{ zIndex: tokenVar(designTokens.zIndex.overlay) }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              onClose();
            }
          }}
        >
          <motion.aside
            ref={panelRef}
            id="mobile-navigation-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className={cn(
              "absolute right-0 top-0 flex h-full w-full max-w-sm flex-col border-l border-border bg-background px-6 py-5 shadow-raised",
            )}
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
          >
            <div className="flex items-center justify-between">
              <Logo size="sm" />
              <Button variant="ghost" size="sm" onClick={onClose} aria-label="Close navigation menu">
                Close
              </Button>
            </div>

            <nav className="mt-10 flex flex-1 flex-col gap-3" aria-label="Mobile">
              {navLinks}
            </nav>
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
