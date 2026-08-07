const colorTokens = {
  brand: {
    50: "--color-brand-50",
    100: "--color-brand-100",
    200: "--color-brand-200",
    300: "--color-brand-300",
    400: "--color-brand-400",
    500: "--color-brand-500",
    600: "--color-brand-600",
    700: "--color-brand-700",
    800: "--color-brand-800",
    900: "--color-brand-900",
  },
  surface: {
    canvas: "--color-bg-canvas",
    surface: "--color-bg-surface",
    subtle: "--color-bg-subtle",
  },
  text: {
    primary: "--color-text-primary",
    secondary: "--color-text-secondary",
    muted: "--color-text-muted",
  },
  border: {
    default: "--color-border-default",
    strong: "--color-border-strong",
  },
  semantic: {
    success: "--color-success-500",
    danger: "--color-danger-500",
  },
} as const;

const typographyTokens = {
  display: "--text-display",
  h1: "--text-h1",
  h2: "--text-h2",
  h3: "--text-h3",
  h4: "--text-h4",
  bodyLg: "--text-body-lg",
  body: "--text-body",
  caption: "--text-caption",
} as const;

const spacingTokens = {
  unit: "--space-unit",
} as const;

const radiusTokens = {
  xs: "--radius-xs",
  sm: "--radius-sm",
  md: "--radius-md",
  lg: "--radius-lg",
  xl: "--radius-xl",
} as const;

const shadowTokens = {
  soft: "--shadow-soft",
  raised: "--shadow-raised",
  focus: "--shadow-focus",
} as const;

const durationTokens = {
  fast: "--duration-fast",
  base: "--duration-base",
  slow: "--duration-slow",
  slowest: "--duration-slowest",
} as const;

const zIndexTokens = {
  base: "--z-base",
  content: "--z-content",
  sticky: "--z-sticky",
  dropdown: "--z-dropdown",
  overlay: "--z-overlay",
  modal: "--z-modal",
  toast: "--z-toast",
  tooltip: "--z-tooltip",
} as const;

const breakpointTokens = {
  xs: "--breakpoint-xs",
  sm: "--breakpoint-sm",
  md: "--breakpoint-md",
  lg: "--breakpoint-lg",
  xl: "--breakpoint-xl",
  "2xl": "--breakpoint-2xl",
} as const;

export const designTokens = {
  color: colorTokens,
  typography: typographyTokens,
  spacing: spacingTokens,
  radius: radiusTokens,
  shadow: shadowTokens,
  duration: durationTokens,
  zIndex: zIndexTokens,
  breakpoint: breakpointTokens,
} as const;

type DeepValue<T> = T extends string
  ? T
  : {
      [K in keyof T]: DeepValue<T[K]>;
    }[keyof T];

export type DesignTokenVariable = DeepValue<typeof designTokens>;

export function tokenVar(token: DesignTokenVariable): `var(${string})` {
  return `var(${token})`;
}
