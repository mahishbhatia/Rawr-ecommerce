import { CardHover, ScrollReveal, StaggerGroup, StaggerItem } from "@/components/animation";
import { Container, Section } from "@/components/ui";
import { benefitItems } from "@/lib/constants/homepage";

import { SectionHeader } from "./section-header";

export function WhyPeopleLoveRawrSection() {
  return (
    <Section spacing="lg" tone="surface">
      <Container>
        <ScrollReveal>
          <SectionHeader
            eyebrow="Why People Love RAWR"
            title="Performance nutrition that feels as good as it tastes."
            description="From morning focus to post-training recovery, RAWR is designed to stay consistent across your entire day."
          />
        </ScrollReveal>

        <StaggerGroup className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {benefitItems.map((item) => (
            <StaggerItem key={item.title}>
              <CardHover className="h-full">
                <article className="h-full rounded-xl border border-border bg-background/70 p-6">
                  <h3 className="text-h4 text-foreground">{item.title}</h3>
                  <p className="mt-3 text-body text-muted-foreground">{item.body}</p>
                </article>
              </CardHover>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </Section>
  );
}
