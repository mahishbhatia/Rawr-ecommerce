import { ScrollReveal, StaggerGroup, StaggerItem } from "@/components/animation";
import { Container, Section } from "@/components/ui";
import { nutritionStats } from "@/lib/constants/homepage";

import { SectionHeader } from "./section-header";

export function NutritionSection() {
  return (
    <Section spacing="lg">
      <Container>
        <ScrollReveal>
          <SectionHeader
            align="center"
            eyebrow="Nutrition Highlights"
            title="Clean-label numbers, visualized for clarity."
            description="RAWR keeps nutrition simple: meaningful protein, honest calories, and no hidden compromises."
          />
        </ScrollReveal>

        <StaggerGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {nutritionStats.map((stat) => (
            <StaggerItem key={stat.label}>
              <article className="h-full rounded-xl border border-border bg-surface/75 p-5 text-center">
                <p className="text-caption uppercase tracking-[0.12em] text-muted-foreground">
                  {stat.label}
                </p>
                <p className="mt-2 text-h2 text-primary">{stat.value}</p>
                <p className="mt-2 text-caption text-muted-foreground">{stat.detail}</p>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </Section>
  );
}
