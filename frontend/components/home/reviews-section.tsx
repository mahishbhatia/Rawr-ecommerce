"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

import { ScrollReveal } from "@/components/animation";
import { Container, Section } from "@/components/ui";
import { getButtonClasses } from "@/components/ui/button";
import { reviews } from "@/lib/constants/homepage";

import { SectionHeader } from "./section-header";

const reviewInterval = 5500;

export function ReviewsSection() {
  const [index, setIndex] = useState(0);
  const current = reviews[index];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((currentIndex) => (currentIndex + 1) % reviews.length);
    }, reviewInterval);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <Section spacing="lg">
      <Container width="content">
        <ScrollReveal>
          <SectionHeader
            align="center"
            eyebrow="Customer Reviews"
            title="Trusted by people who demand more from every snack."
            description="Real feedback from athletes, creators, and high-performers who use RAWR in everyday life."
          />
        </ScrollReveal>

        <div className="mt-10 rounded-2xl border border-border bg-surface/70 p-6 sm:p-8">
          <AnimatePresence mode="wait">
            <motion.figure
              key={`${current.name}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <blockquote className="text-h3 leading-relaxed text-foreground">
                “{current.quote}”
              </blockquote>
              <figcaption className="mt-6 text-body text-muted-foreground">
                <span className="font-semibold text-foreground">{current.name}</span> ·{" "}
                {current.role}
              </figcaption>
            </motion.figure>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-between">
            <div className="flex gap-2">
              {reviews.map((review, reviewIndex) => (
                <button
                  key={`${review.name}-${reviewIndex}`}
                  type="button"
                  className={
                    reviewIndex === index
                      ? "h-2.5 w-8 rounded-full bg-primary"
                      : "h-2.5 w-2.5 rounded-full bg-neutral-400/70"
                  }
                  aria-label={`Show review from ${review.name}`}
                  onClick={() => setIndex(reviewIndex)}
                />
              ))}
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                aria-label="Previous review"
                className={getButtonClasses({ variant: "ghost", size: "sm" })}
                onClick={() =>
                  setIndex((currentIndex) =>
                    currentIndex === 0 ? reviews.length - 1 : currentIndex - 1,
                  )
                }
              >
                <FiArrowLeft />
              </button>
              <button
                type="button"
                aria-label="Next review"
                className={getButtonClasses({ variant: "ghost", size: "sm" })}
                onClick={() => setIndex((currentIndex) => (currentIndex + 1) % reviews.length)}
              >
                <FiArrowRight />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
