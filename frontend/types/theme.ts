import { theme } from '@/constants/theme';

export type Theme = typeof theme;
export type ColorGroupKey = keyof Theme['colors'];
export type SpacingKey = keyof Theme['spacing'];
export type RadiusKey = keyof Theme['radius'];
export type ShadowKey = keyof Theme['shadows'];
export type TypographyKey = keyof Theme['typography']['fontSize'];
export type BreakpointKey = keyof Theme['breakpoints'];