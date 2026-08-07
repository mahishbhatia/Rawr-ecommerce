"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { Floating, ScrollReveal, SlideLeft, SlideRight } from "@/components/animation";
import { Container, Section } from "@/components/ui";
import {
  homepageProductImages,
  nutritionStats,
  productHotspots,
} from "@/lib/constants/homepage";
import { cn } from "@/lib/utils/cn";

import { SectionHeader } from "./section-header";

export function TheBarSection() {
  const [activeHotspotId, setActiveHotspotId] = useState(productHotspots[0]?.id ?? "");
  const prefersReducedMotion = useReducedMotion();

  const activeHotspot = useMemo(
    () => productHotspots.find((item) => item.id === activeHotspotId) ?? productHotspots[0],
    [activeHotspotId],
  );

  return (
    <Section spacing="lg">
      <Container>
        <ScrollReveal>
          <SectionHeader
            align="center"
            eyebrow="The Bar"
            title="A single flagship product, refined from ingredient to finish."
            description="Built to look premium, taste bold, and fuel performance without compromise."
          />
        </ScrollReveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_340px] lg:items-center">
          <SlideLeft>
            <div className="relative mx-auto w-full max-w-xl rounded-2xl border border-border bg-surface/60 p-6">
              <Floating amplitude={prefersReducedMotion ? 0 : 12} duration={3.4}>
                <motion.div
                  className="relative aspect-[4/5] w-full"
                  onMouseMove={(event) => {
                    if (prefersReducedMotion) {
                      return;
                    }

                    const rect = event.currentTarget.getBoundingClientRect();
                    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 14;
                    const y = ((event.clientY - rect.top) / rect.height - 0.5) * -14;
                    event.currentTarget.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg)`;
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.transform =
                      "perspective(1000px) rotateX(0deg) rotateY(0deg)";
                  }}
                  transition={{ type: "spring", stiffness: 120, damping: 18 }}
                >
                  <Image
                    src={homepageProductImages.desktop}
                    alt="RAWR Protein Choco Crunch bar close-up product hero"
                    fill
                    className="hidden object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.35)] md:block"
                    sizes="(min-width: 1024px) 45vw, 90vw"
                  />
                  <Image
                    src={homepageProductImages.mobile}
                    alt="RAWR Protein Choco Crunch bar close-up product hero"
                    fill
                    className="object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.35)] md:hidden"
                    sizes="90vw"
                  />
                </motion.div>
              </Floating>

              {productHotspots.map((hotspot) => (
                <button
                  key={hotspot.id}
                  type="button"
                  aria-label={hotspot.label}
                  className={cn(
                    "absolute h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border bg-background/85 text-caption font-bold text-primary backdrop-blur transition",
                    activeHotspotId === hotspot.id
                      ? "border-primary shadow-focus"
                      : "border-border hover:border-primary",
                  )}
                  style={{
                    left: `${hotspot.xPercent}%`,
                    top: `${hotspot.yPercent}%`,
                  }}
                  onMouseEnter={() => setActiveHotspotId(hotspot.id)}
                  onFocus={() => setActiveHotspotId(hotspot.id)}
                  onClick={() => setActiveHotspotId(hotspot.id)}
                >
                  +
                </button>
              ))}
            </div>
          </SlideLeft>

          <SlideRight>
            <aside className="rounded-xl border border-border bg-surface/80 p-6">
              <h3 className="text-h4 text-foreground">{activeHotspot.label}</h3>
              <p className="mt-3 text-body text-muted-foreground">{activeHotspot.detail}</p>

              <div className="mt-7 space-y-3">
                {nutritionStats.slice(0, 3).map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-md border border-border bg-background/70 p-3"
                  >
                    <p className="text-caption uppercase tracking-wider text-muted-foreground">
                      {stat.label}
                    </p>
                    <p className="mt-1 text-h3 text-foreground">{stat.value}</p>
                  </div>
                ))}
              </div>
            </aside>
          </SlideRight>
        </div>
      </Container>
    </Section>
  );
}
