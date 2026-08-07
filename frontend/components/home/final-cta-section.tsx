import Image from "next/image";
import Link from "next/link";

import { ImageReveal, MagneticButton, SlideUp } from "@/components/animation";
import { Container, Heading, Section } from "@/components/ui";
import { getButtonClasses } from "@/components/ui/button";
import { homepageLifestyleImages } from "@/lib/constants/homepage";

export function FinalCtaSection() {
  return (
    <Section spacing="lg">
      <Container>
        <div className="overflow-hidden rounded-2xl border border-border bg-surface/75 p-6 sm:p-10">
          <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_1fr]">
            <SlideUp>
              <div>
                <p className="text-caption font-semibold uppercase tracking-[0.16em] text-primary">
                  Final Call
                </p>
                <Heading as="h2" size="h1" className="mt-3 max-w-xl">
                  Fuel Better. Eat Cleaner. As Raw As You.
                </Heading>
                <p className="mt-5 max-w-xl text-body-lg text-muted-foreground">
                  One premium bar built for ambitious days. Keep your standards high
                  even when your schedule is full.
                </p>
                <div className="mt-8">
                  <MagneticButton>
                    <Link href="/shop" className={getButtonClasses({ size: "lg" })}>
                      Shop Now
                    </Link>
                  </MagneticButton>
                </div>
              </div>
            </SlideUp>

            <ImageReveal className="rounded-xl border border-border bg-background/50">
              <div className="relative mx-auto aspect-[4/3] w-full max-w-xl">
                <Image
                  src={homepageLifestyleImages.desktop}
                  alt="RAWR lifestyle frame showcasing clean premium snacking"
                  fill
                  className="hidden object-cover md:block"
                  sizes="(min-width: 1024px) 35vw, 90vw"
                />
                <Image
                  src={homepageLifestyleImages.mobile}
                  alt="RAWR lifestyle frame showcasing clean premium snacking"
                  fill
                  className="object-cover md:hidden"
                  sizes="90vw"
                />
              </div>
            </ImageReveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
