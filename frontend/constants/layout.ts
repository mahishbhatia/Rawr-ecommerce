export const layout = {
  containerMaxWidth: { narrow: '768px', default: '1440px', wide: '1680px', full: 'none' },
  containerPadding: { base: '20px', tablet: '40px', desktop: '80px' },
  sectionSpacing: {
    sm: { base: '48px', tablet: '64px' },
    md: { base: '64px', tablet: '96px' },
    lg: { base: '96px', tablet: '128px' },
  },
} as const;

export type ContainerMaxWidthKey = keyof typeof layout.containerMaxWidth;
export type SectionSpacingKey = keyof typeof layout.sectionSpacing;