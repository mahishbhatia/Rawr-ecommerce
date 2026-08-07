"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

import { Floating, MagneticButton, TextReveal } from "@/components/animation";
import { Container, Heading } from "@/components/ui";
import { getButtonClasses } from "@/components/ui/button";
import {
  heroSlides,
  homepageProductImages,
  type HeroSlide,
} from "@/lib/constants/homepage";
import { cn } from "@/lib/utils/cn";

const autoSlideDelay = 6800;

const contentWidthStyles: Record<HeroSlide["contentWidth"], string> = {
  narrow: "max-w-xl",
  regular: "max-w-2xl",
  wide: "max-w-3xl",
};

const textAlignmentStyles: Record<HeroSlide["textAlignment"], string> = {
  left: "text-left",
  center: "text-center",
};

const contentAlignmentStyles: Record<HeroSlide["textAlignment"], string> = {
  left: "items-start",
  center: "items-center",
};

const heroAnimationPresets: Record<
  HeroSlide["animationPreset"],
  {
    initial: { opacity: number; scale: number };
    animate: { opacity: number; scale: number };
    exit: { opacity: number; scale: number };
    transition: { duration: number };
  }
> = {
  cinematic: {
    initial: { opacity: 0.08, scale: 1.06 },
    animate: { opacity: 1, scale: 1.02 },
    exit: { opacity: 0.12, scale: 1.04 },
    transition: { duration: 0.88 },
  },
  editorial: {
    initial: { opacity: 0.08, scale: 1.02 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0.1, scale: 1.01 },
    transition: { duration: 0.92 },
  },
  product: {
    initial: { opacity: 0.1, scale: 1.05 },
    animate: { opacity: 1, scale: 1.01 },
    exit: { opacity: 0.14, scale: 1.03 },
    transition: { duration: 0.86 },
  },
};

const objectFitClassByMode: Record<HeroSlide["objectFit"], string> = {
  cover: "object-cover",
  "cover-focal": "object-cover",
  contain: "object-contain",
  "contain-blur": "object-contain",
};

function SlideBackdrop({
  slide,
  isActive,
}: {
  slide: HeroSlide;
  isActive: boolean;
}) {
  const preset = heroAnimationPresets[slide.animationPreset];

  return (
    <motion.div
      className="absolute inset-0"
      initial={preset.initial}
      animate={preset.animate}
      exit={preset.exit}
      transition={preset.transition}
    >
      {slide.objectFit === "contain-blur" ? (
        <>
          <Image
            src={slide.desktopImage}
            alt={slide.alt}
            fill
            priority={isActive}
            className="hidden object-cover blur-2xl md:block"
            style={{
              objectPosition: slide.objectPosition.desktop,
              filter: `brightness(${Math.max(0.6, slide.brightness - 0.28)}) contrast(${slide.contrast})`,
              transform: `scale(${Math.max(1.08, slide.imageScale.desktop + 0.15)})`,
            }}
            sizes="100vw"
          />
          <Image
            src={slide.mobileImage}
            alt={slide.alt}
            fill
            priority={isActive}
            className="object-cover blur-xl md:hidden"
            style={{
              objectPosition: slide.objectPosition.mobile,
              filter: `brightness(${Math.max(0.6, slide.brightness - 0.28)}) contrast(${slide.contrast})`,
              transform: `scale(${Math.max(1.08, slide.imageScale.mobile + 0.15)})`,
            }}
            sizes="100vw"
          />
        </>
      ) : null}

      <div className="relative h-full w-full">
        <Image
          src={slide.desktopImage}
          alt={slide.alt}
          fill
          priority={isActive}
          className={cn("hidden md:block", objectFitClassByMode[slide.objectFit])}
          style={{
            objectPosition: slide.objectPosition.desktop,
            filter: `brightness(${slide.brightness}) contrast(${slide.contrast}) blur(${slide.blur}px)`,
            transform: `scale(${slide.imageScale.desktop})`,
          }}
          sizes="100vw"
        />
        <Image
          src={slide.mobileImage}
          alt={slide.alt}
          fill
          priority={isActive}
          className={cn("md:hidden", objectFitClassByMode[slide.objectFit])}
          style={{
            objectPosition: slide.objectPosition.mobile,
            filter: `brightness(${slide.brightness}) contrast(${slide.contrast}) blur(${slide.blur}px)`,
            transform: `scale(${slide.imageScale.mobile})`,
          }}
          sizes="100vw"
        />
      </div>
    </motion.div>
  );
}

export function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const cursorX = useMotionValue(50);
  const cursorY = useMotionValue(50);
  const smoothCursorX = useSpring(cursorX, { stiffness: 120, damping: 20 });
  const smoothCursorY = useSpring(cursorY, { stiffness: 120, damping: 20 });
  const cursorLeft = useTransform(smoothCursorX, (value) => `${value}%`);
  const cursorTop = useTransform(smoothCursorY, (value) => `${value}%`);

  const activeSlide = heroSlides[activeIndex];

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % heroSlides.length);
    }, autoSlideDelay);

    return () => window.clearInterval(timer);
  }, [prefersReducedMotion]);

  const slideDots = useMemo(
    () =>
      heroSlides.map((slide, index) => (
        <button
          key={slide.id}
          type="button"
          aria-label={`Go to ${slide.title}`}
          onClick={() => setActiveIndex(index)}
          className={cn(
            "h-2.5 rounded-full border border-transparent transition-all duration-300",
            index === activeIndex
              ? "w-9 bg-primary shadow-[0_0_24px_rgba(241,90,36,0.5)]"
              : "w-2.5 bg-neutral-100/55 hover:scale-110 hover:bg-neutral-0/90",
          )}
        />
      )),
    [activeIndex],
  );

  return (
    <section
      className="relative isolate min-h-[calc(100vh-5rem)] overflow-hidden pb-6 md:pb-0"
      aria-label="Hero"
      onMouseMove={(event) => {
        if (prefersReducedMotion) {
          return;
        }

        const rect = event.currentTarget.getBoundingClientRect();
        cursorX.set(((event.clientX - rect.left) / rect.width) * 100);
        cursorY.set(((event.clientY - rect.top) / rect.height) * 100);
      }}
    >
      <AnimatePresence mode="wait">
        <SlideBackdrop key={activeSlide.id} slide={activeSlide} isActive={activeIndex === 0} />
      </AnimatePresence>

      <div
        className="absolute inset-0"
        style={{
          background: activeSlide.overlayGradient,
          opacity: activeSlide.overlayOpacity,
        }}
      />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(241,90,36,0.2),transparent_36%),radial-gradient(circle_at_82%_84%,rgba(255,255,255,0.07),transparent_42%)]" />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute hidden h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgba(241,90,36,0.25),rgba(241,90,36,0)_68%)] blur-2xl md:block"
        style={{
          left: cursorLeft,
          top: cursorTop,
          x: "-50%",
          y: "-50%",
        }}
      />

      <Container className="relative grid min-h-[calc(100vh-5rem)] items-end gap-8 pb-8 pt-24 sm:items-center sm:pb-10 md:pt-28 lg:grid-cols-[1fr_0.96fr] lg:gap-2">
        <div
          className={cn(
            "z-[1] flex flex-col",
            contentWidthStyles[activeSlide.contentWidth],
            textAlignmentStyles[activeSlide.textAlignment],
            contentAlignmentStyles[activeSlide.textAlignment],
          )}
        >
          <p className="text-caption font-semibold uppercase tracking-[0.2em] text-primary">
            RAWR
          </p>
          <p className="mt-4 text-body font-medium uppercase tracking-[0.14em] text-neutral-100 sm:text-body-lg">
            As Raw As You.
          </p>

          <Heading
            as="h1"
            size="display"
            className="mt-3 text-[2.25rem] leading-[1.04] text-neutral-0 sm:text-[3.2rem] lg:text-[4.55rem]"
          >
            <TextReveal text={activeSlide.title} />
          </Heading>

          <p className="mt-4 text-h4 font-semibold text-neutral-50">{activeSlide.subtitle}</p>
          <p className="mt-4 max-w-2xl text-body text-neutral-100/95 sm:text-body-lg">
            {activeSlide.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3 sm:mt-9">
            <MagneticButton className="inline-flex">
              <Link
                href="/shop"
                className={getButtonClasses({
                  size: "lg",
                  className:
                    "rounded-full px-8 shadow-[0_16px_38px_rgba(241,90,36,0.38)] transition-transform duration-300 hover:-translate-y-0.5 active:translate-y-0 focus-visible:shadow-[0_0_0_3px_rgba(241,90,36,0.45)]",
                })}
              >
                Shop Now
              </Link>
            </MagneticButton>

            <Link
              href="#why-rawr"
              className={getButtonClasses({
                variant: "secondary",
                size: "lg",
                className:
                  "rounded-full border-border bg-background/45 px-7 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-0.5 active:translate-y-0",
              })}
            >
              Know The Difference
            </Link>
          </div>

          <div className="mt-9 flex w-full items-center justify-between gap-4 sm:mt-10 sm:max-w-lg">
            <div className="rounded-full border border-border/80 bg-background/35 px-3 py-2 backdrop-blur-md">
              <div className="flex items-center gap-2.5">{slideDots}</div>
            </div>

            <div className="rounded-full border border-border/80 bg-background/35 p-1.5 backdrop-blur-md">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  aria-label="Previous hero slide"
                  className={getButtonClasses({
                    variant: "ghost",
                    size: "sm",
                    className:
                      "rounded-full border border-transparent bg-background/0 hover:scale-105 hover:border-border hover:bg-background/60",
                  })}
                  onClick={() =>
                    setActiveIndex((current) =>
                      current === 0 ? heroSlides.length - 1 : current - 1,
                    )
                  }
                >
                  <FiArrowLeft />
                </button>
                <button
                  type="button"
                  aria-label="Next hero slide"
                  className={getButtonClasses({
                    variant: "ghost",
                    size: "sm",
                    className:
                      "rounded-full border border-transparent bg-background/0 hover:scale-105 hover:border-border hover:bg-background/60",
                  })}
                  onClick={() =>
                    setActiveIndex((current) => (current + 1) % heroSlides.length)
                  }
                >
                  <FiArrowRight />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="relative mx-auto flex w-full max-w-[22rem] justify-center sm:max-w-[24rem] lg:max-w-[31rem]">
          <Floating amplitude={prefersReducedMotion ? 0 : 10} duration={3.2}>
            <div className="relative aspect-[4/5] w-full rounded-[2rem] border border-border/70 bg-background/36 p-4 shadow-[0_30px_84px_rgba(0,0,0,0.5)] backdrop-blur-sm">
              <div className="relative h-full w-full overflow-hidden rounded-[1.45rem] bg-gradient-to-br from-brand-900/24 via-transparent to-brand-500/22">
                <Image
                  src={homepageProductImages.desktop}
                  alt="RAWR Protein Choco Crunch product pack as the hero centerpiece"
                  fill
                  priority
                  className="hidden object-contain drop-shadow-[0_35px_56px_rgba(0,0,0,0.52)] md:block"
                  sizes="(min-width: 1024px) 40vw, 78vw"
                />
                <Image
                  src={homepageProductImages.mobile}
                  alt="RAWR Protein Choco Crunch product pack as the hero centerpiece"
                  fill
                  priority
                  className="object-contain drop-shadow-[0_35px_56px_rgba(0,0,0,0.52)] md:hidden"
                  sizes="78vw"
                />
              </div>
            </div>
          </Floating>
        </div>
      </Container>
    </section>
  );
}
