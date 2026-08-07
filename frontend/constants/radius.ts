export const radius = {
  none: '0px', sm: '4px', md: '8px', lg: '12px', xl: '20px', '2xl': '28px', full: '9999px',
} as const;

export type RadiusToken = keyof typeof radius;