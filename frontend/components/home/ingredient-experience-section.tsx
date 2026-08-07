import { CardHover, ScrollReveal, StaggerGroup, StaggerItem } from "@/components/animation";
import { Container, Section } from "@/components/ui";
import { ingredients, type IngredientItem } from "@/lib/constants/homepage";
import { FiDroplet, FiFeather, FiHeart, FiShield, FiStar, FiSun } from "react-icons/fi";
import type { IconType } from "react-icons";

import { SectionHeader } from "./section-header";

const iconByIngredient: Record<IngredientItem["icon"], IconType> = {
  cocoa: FiStar,
  honey: FiSun,
  dates: FiDroplet,
  cashew: FiHeart,
  almonds: FiShield,
  whey: FiFeather,
};

export function IngredientExperienceSection() {
  return (
    <Section spacing="lg" tone="subtle">
      <Container>
        <ScrollReveal>
          <SectionHeader
            eyebrow="Ingredient Experience"
            title="Every ingredient is selected for function, flavor, and clarity."
            description="No filler ingredients. No mystery blends. Just the six components that make RAWR perform and taste exceptional."
          />
        </ScrollReveal>

        <StaggerGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ingredients.map((ingredient) => {
            const Icon = iconByIngredient[ingredient.icon];

            return (
              <StaggerItem key={ingredient.id}>
                <CardHover className="h-full">
                  <article className="h-full rounded-xl border border-border bg-background/70 p-6">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-border bg-surface text-primary">
                      <Icon size={18} />
                    </div>
                    <h3 className="mt-4 text-h4 text-foreground">{ingredient.name}</h3>
                    <p className="mt-3 text-body text-muted-foreground">
                      {ingredient.description}
                    </p>
                  </article>
                </CardHover>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </Container>
    </Section>
  );
}
