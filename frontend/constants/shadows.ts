export const shadows = {
  sm: '0 1px 2px rgba(0, 0, 0, 0.35)',
  md: '0 4px 12px rgba(0, 0, 0, 0.45)',
  lg: '0 12px 32px rgba(0, 0, 0, 0.55)',
  glow: '0 0 24px rgba(241, 90, 36, 0.45)',
  glowStrong: '0 0 48px rgba(241, 90, 36, 0.65)',
} as const;

export type ShadowToken = keyof typeof shadows;