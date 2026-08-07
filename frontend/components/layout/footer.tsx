import Link from "next/link";

import { Logo } from "@/components/branding/logo";
import { Container, Section } from "@/components/ui";
import {
  footerQuickLinks,
  socialLinks,
} from "@/lib/constants/navigation";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface/60">
      <Section spacing="lg">
        <Container>
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <Logo size="sm" showTagline />
              <p className="mt-4 max-w-md text-caption text-muted-foreground">
                Premium performance snacks for relentless people. Built with raw
                intensity and clean ingredients.
              </p>
            </div>

            <div>
              <h2 className="text-caption font-semibold uppercase tracking-wide text-foreground">
                Quick Links
              </h2>
              <ul className="mt-4 space-y-2">
                {footerQuickLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-caption text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-caption font-semibold uppercase tracking-wide text-foreground">
                Social
              </h2>
              <ul className="mt-4 space-y-2">
                {socialLinks.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-caption text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-caption font-semibold uppercase tracking-wide text-foreground">
                Contact
              </h2>
              <ul className="mt-4 space-y-2 text-caption text-muted-foreground">
                <li>hello@rawr.com</li>
                <li>+1 (000) 000-0000</li>
                <li>New York, NY</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 grid gap-6 border-t border-border pt-8 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="text-caption font-semibold uppercase tracking-wide text-foreground">
                Newsletter
              </h2>
              <p className="mt-2 text-caption text-muted-foreground">
                Coming soon: early drops, limited bundles, and member-only perks.
              </p>
            </div>
            <p className="text-caption text-muted-foreground md:text-right">
              © {new Date().getFullYear()} RAWR. All rights reserved.
            </p>
          </div>
        </Container>
      </Section>
    </footer>
  );
}
