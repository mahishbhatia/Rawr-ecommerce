import type { ReactNode } from "react";

import { PageTransition } from "@/components/animation";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { ScrollProgressIndicator } from "@/components/layout/scroll-progress-indicator";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";

export interface SiteLayoutProps {
  children: ReactNode;
}

export function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <SmoothScrollProvider>
      <div className="min-h-screen bg-background text-foreground">
        <ScrollProgressIndicator />
        <Navbar />
        <main id="main-content" className="pt-20">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </div>
    </SmoothScrollProvider>
  );
}
