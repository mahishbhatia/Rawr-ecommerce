import { CardHover, ScrollReveal, StaggerGroup, StaggerItem } from "@/components/animation";
import { Container, Section } from "@/components/ui";
import { whyRawrCards } from "@/lib/constants/homepage";

import { SectionHeader } from "./section-header";

export function WhyRawrSection() {
  return (
    <Section id="why-rawr" spacing="lg" tone="surface">
      <Container>
        <ScrollReveal>
          <SectionHeader
            eyebrow="Why RAWR Exists"
            title="Most snacks are engineered for shelf life. We built RAWR for real life."
            description="RAWR was created for people who train, build, and move with intention. Every bite should support performance, not sabotage it."
          />
        </ScrollReveal>

        <StaggerGroup className="mt-10 grid gap-4 md:grid-cols-3">
          {whyRawrCards.map((item) => (
            <StaggerItem key={item.title}>
              <CardHover className="h-full">
                <article className="h-full rounded-lg border border-border bg-background/70 p-6">
                  <h3 className="text-h4 text-foreground">{item.title}</h3>
                  <p className="mt-4 text-body text-muted-foreground">{item.body}</p>
                </article>
              </CardHover>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </Section>
  );
}
