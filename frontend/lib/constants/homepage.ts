import type { StaticImageData } from "next/image";

import heroSlide1Desktop from "../../../assets/desktop/hero-slide-1.png";
import heroSlide2Desktop from "../../../assets/desktop/hero-slide-2.png";
import heroSlide3Desktop from "../../../assets/desktop/hero-slide-3.png";
import lifestyle1Desktop from "../../../assets/desktop/lifestyle-1.jpeg";
import productMainDesktop from "../../../assets/desktop/product-main.jpeg";
import heroSlide1Mobile from "../../../assets/mobile/hero-slide-1.png";
import heroSlide2Mobile from "../../../assets/mobile/hero-slide-2.png";
import heroSlide3Mobile from "../../../assets/mobile/hero-slide-3.png";
import lifestyle1Mobile from "../../../assets/mobile/lifestyle-1.jpeg";
import productMainMobile from "../../../assets/mobile/product-main.jpeg";

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  desktopImage: StaticImageData;
  mobileImage: StaticImageData;
  objectFit: "cover" | "contain" | "contain-blur" | "cover-focal";
  objectPosition: {
    desktop: string;
    mobile: string;
  };
  imageScale: {
    desktop: number;
    mobile: number;
  };
  overlayOpacity: number;
  overlayGradient: string;
  textAlignment: "left" | "center";
  contentWidth: "narrow" | "regular" | "wide";
  brightness: number;
  contrast: number;
  blur: number;
  animationPreset: "cinematic" | "editorial" | "product";
  alt: string;
}

export const heroSlides: readonly HeroSlide[] = [
  {
    id: "origin",
    title: "As Raw As You.",
    subtitle: "RAWR Protein Choco Crunch",
    description: "Real ingredients. Real performance. Zero fake fuel.",
    desktopImage: heroSlide1Desktop,
    mobileImage: heroSlide1Mobile,
    objectFit: "contain-blur",
    objectPosition: {
      desktop: "center top",
      mobile: "center top",
    },
    imageScale: {
      desktop: 0.94,
      mobile: 0.9,
    },
    overlayOpacity: 0.58,
    overlayGradient:
      "linear-gradient(to bottom, rgba(10,10,10,0.62), rgba(10,10,10,0.42) 42%, rgba(15,15,16,0.86) 100%), radial-gradient(circle at 50% 10%, rgba(241,90,36,0.22), transparent 55%)",
    textAlignment: "left",
    contentWidth: "regular",
    brightness: 0.94,
    contrast: 1.1,
    blur: 0,
    animationPreset: "editorial",
    alt: "RAWR Protein Choco Crunch bar in dramatic premium studio lighting",
  },
  {
    id: "strength",
    title: "Clean power for work, training, and recovery.",
    subtitle: "One flagship bar. Engineered for relentless days.",
    description: "No crash. No junk. Just dependable energy you can trust.",
    desktopImage: heroSlide2Desktop,
    mobileImage: heroSlide2Mobile,
    objectFit: "cover-focal",
    objectPosition: {
      desktop: "center center",
      mobile: "center top",
    },
    imageScale: {
      desktop: 1.03,
      mobile: 1.08,
    },
    overlayOpacity: 0.52,
    overlayGradient:
      "linear-gradient(to bottom, rgba(8,8,9,0.58), rgba(8,8,9,0.35) 40%, rgba(15,15,16,0.82) 100%), radial-gradient(circle at 18% 24%, rgba(241,90,36,0.24), transparent 42%)",
    textAlignment: "left",
    contentWidth: "wide",
    brightness: 0.96,
    contrast: 1.12,
    blur: 0,
    animationPreset: "cinematic",
    alt: "RAWR bar with performance-led lifestyle background",
  },
  {
    id: "ritual",
    title: "One bar. One standard. Uncompromising nutrition.",
    subtitle: "Built for people who train hard and expect more from every bite.",
    description: "Designed to be the cleanest part of your daily routine.",
    desktopImage: heroSlide3Desktop,
    mobileImage: heroSlide3Mobile,
    objectFit: "cover",
    objectPosition: {
      desktop: "right center",
      mobile: "center center",
    },
    imageScale: {
      desktop: 1.05,
      mobile: 1.06,
    },
    overlayOpacity: 0.56,
    overlayGradient:
      "linear-gradient(to bottom, rgba(6,6,7,0.58), rgba(6,6,7,0.34) 42%, rgba(15,15,16,0.84) 100%), radial-gradient(circle at 84% 70%, rgba(241,90,36,0.2), transparent 48%)",
    textAlignment: "left",
    contentWidth: "regular",
    brightness: 0.97,
    contrast: 1.14,
    blur: 0,
    animationPreset: "product",
    alt: "Premium composition featuring RAWR bar and natural ingredients",
  },
] as const;

export interface WhyRawrCard {
  title: string;
  body: string;
}

export const whyRawrCards: readonly WhyRawrCard[] = [
  {
    title: "Processed snacks promise energy but deliver noise.",
    body: "Most bars hide behind syrups, fillers, and artificial flavor systems that burn fast and leave you flat.",
  },
  {
    title: "Natural nutrition should work as hard as you do.",
    body: "Performance food must be digestible, honest, and consistent whether your day starts at 6am or ends after training.",
  },
  {
    title: "RAWR exists to reset the standard.",
    body: "Protein-forward, ingredient-led, and obsessively clean so your nutrition never becomes the weakest link.",
  },
] as const;

export interface ProductHotspot {
  id: string;
  label: string;
  xPercent: number;
  yPercent: number;
  detail: string;
}

export const productHotspots: readonly ProductHotspot[] = [
  {
    id: "protein",
    label: "Protein Core",
    xPercent: 52,
    yPercent: 42,
    detail: "Whey protein supports muscle recovery with a clean chocolate profile.",
  },
  {
    id: "natural-sweetness",
    label: "Natural Sweetness",
    xPercent: 67,
    yPercent: 56,
    detail: "Dates and honey deliver balanced sweetness without refined sugar spikes.",
  },
  {
    id: "healthy-fats",
    label: "Sustained Fuel",
    xPercent: 36,
    yPercent: 60,
    detail: "Cashew and almond provide satiety and long-lasting energy release.",
  },
] as const;

export interface IngredientItem {
  id: string;
  name: string;
  description: string;
  icon: "cocoa" | "honey" | "dates" | "cashew" | "almonds" | "whey";
}

export const ingredients: readonly IngredientItem[] = [
  {
    id: "cocoa",
    name: "Cocoa",
    description: "Deep chocolate character with natural antioxidants and zero artificial aftertaste.",
    icon: "cocoa",
  },
  {
    id: "honey",
    name: "Honey",
    description: "Smooth natural sweetness that supports energy without a harsh sugar crash.",
    icon: "honey",
  },
  {
    id: "dates",
    name: "Dates",
    description: "Whole-fruit sweetness and fiber for sustained release and cleaner digestion.",
    icon: "dates",
  },
  {
    id: "cashew",
    name: "Cashew",
    description: "Creamy texture and healthy fats for satiety between meals and training blocks.",
    icon: "cashew",
  },
  {
    id: "almonds",
    name: "Almonds",
    description: "Crunch, micronutrients, and quality fats that keep the bar naturally complete.",
    icon: "almonds",
  },
  {
    id: "whey",
    name: "Whey",
    description: "High-quality protein to support recovery and daily strength goals.",
    icon: "whey",
  },
] as const;

export interface NutritionStat {
  label: string;
  value: string;
  detail: string;
}

export const nutritionStats: readonly NutritionStat[] = [
  {
    label: "Protein",
    value: "20g",
    detail: "High-quality whey per bar",
  },
  {
    label: "Calories",
    value: "220",
    detail: "Balanced fuel for active days",
  },
  {
    label: "Natural Ingredients",
    value: "6",
    detail: "Every ingredient has a purpose",
  },
  {
    label: "No Added Sugar",
    value: "0g",
    detail: "Sweetened by dates and honey only",
  },
  {
    label: "No Preservatives",
    value: "100%",
    detail: "Clean label from first bite to last",
  },
] as const;

export interface BenefitItem {
  title: string;
  body: string;
}

export const benefitItems: readonly BenefitItem[] = [
  {
    title: "Energy",
    body: "Stable, usable fuel for long workdays, heavy sessions, and everything between.",
  },
  {
    title: "Recovery",
    body: "Quality protein helps support muscle repair without the processed bloat.",
  },
  {
    title: "Taste",
    body: "Bold choco crunch with texture that feels indulgent but performs clean.",
  },
  {
    title: "Natural Ingredients",
    body: "Short ingredient list. No synthetic fillers, no unnecessary chemistry.",
  },
  {
    title: "Clean Nutrition",
    body: "Built for people who read labels and expect nutrition to be honest.",
  },
] as const;

export interface ReviewItem {
  name: string;
  role: string;
  quote: string;
}

export const reviews: readonly ReviewItem[] = [
  {
    name: "Anaya S.",
    role: "CrossFit Coach",
    quote: "RAWR is the first bar my clients actually enjoy and still trust before training.",
  },
  {
    name: "Karan M.",
    role: "Product Designer",
    quote: "No sugar crash, clean focus, and the crunch is unreal. It feels like premium fuel.",
  },
  {
    name: "Rhea P.",
    role: "Marathon Runner",
    quote: "I keep one in every bag. It tastes real and sits light even on long run days.",
  },
] as const;

export interface FaqItem {
  question: string;
  answer: string;
}

export const faqs: readonly FaqItem[] = [
  {
    question: "Is RAWR suitable as a pre-workout snack?",
    answer:
      "Yes. RAWR is designed for steady energy with quality protein and natural carbohydrates, making it ideal before or after training.",
  },
  {
    question: "Does RAWR contain refined sugar or preservatives?",
    answer:
      "No. RAWR uses ingredient-led sweetness from dates and honey, with no added refined sugar or synthetic preservatives.",
  },
  {
    question: "How often can I consume RAWR?",
    answer:
      "RAWR fits daily routines—post workout, midday fuel, or whenever you need clean, reliable nutrition.",
  },
] as const;

export const homepageProductImages = {
  desktop: productMainDesktop,
  mobile: productMainMobile,
} as const;

export const homepageLifestyleImages = {
  desktop: lifestyle1Desktop,
  mobile: lifestyle1Mobile,
} as const;
