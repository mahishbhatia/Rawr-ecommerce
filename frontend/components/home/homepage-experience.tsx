import { HeroSection } from "@/components/home/hero-section";
import { WhyRawrSection } from "@/components/home/why-rawr-section";
import { TheBarSection } from "@/components/home/the-bar-section";
import { IngredientExperienceSection } from "@/components/home/ingredient-experience-section";
import { NutritionSection } from "@/components/home/nutrition-section";
import { WhyPeopleLoveRawrSection } from "@/components/home/why-people-love-rawr-section";
import { ReviewsSection } from "@/components/home/reviews-section";
import { FaqSection } from "@/components/home/faq-section";
import { FinalCtaSection } from "@/components/home/final-cta-section";

export function HomepageExperience() {
  return (
    <>
      <HeroSection />
      <WhyRawrSection />
      <TheBarSection />
      <IngredientExperienceSection />
      <NutritionSection />
      <WhyPeopleLoveRawrSection />
      <ReviewsSection />
      <FaqSection />
      <FinalCtaSection />
    </>
  );
}
