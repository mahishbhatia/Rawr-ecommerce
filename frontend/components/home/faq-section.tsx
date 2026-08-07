"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiMinus, FiPlus } from "react-icons/fi";

import { ScrollReveal } from "@/components/animation";
import { Container, Section } from "@/components/ui";
import { faqs } from "@/lib/constants/homepage";

import { SectionHeader } from "./section-header";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <Section spacing="lg" tone="subtle">
      <Container width="content">
        <ScrollReveal>
          <SectionHeader
            align="center"
            eyebrow="FAQ"
            title="Answers for people who care about what they eat."
            description="Everything you need to know about RAWR before your first order."
          />
        </ScrollReveal>

        <div className="mt-10 space-y-3">
          {faqs.map((item, index) => {
            const isOpen = index === openIndex;

            return (
              <article key={item.question} className="rounded-xl border border-border bg-surface/70">
                <h3>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                  >
                    <span className="text-body-lg font-semibold text-foreground">
                      {item.question}
                    </span>
                    {isOpen ? <FiMinus /> : <FiPlus />}
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <p className="px-5 pb-5 text-body text-muted-foreground">{item.answer}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </article>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
