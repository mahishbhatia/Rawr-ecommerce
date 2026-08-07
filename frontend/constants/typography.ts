export const typography = {
  fontFamily: {
    display: 'var(--font-display), var(--font-geist-sans), "Helvetica Neue", Arial, sans-serif',
    body: 'var(--font-body), var(--font-geist-sans), "Helvetica Neue", Arial, sans-serif',
    mono: 'var(--font-geist-mono), "SFMono-Regular", Menlo, Consolas, monospace',
  },
  fontSize: {
    display: { size: '4.5rem', lineHeight: '1.05', letterSpacing: '-0.03em' },
    h1: { size: '3rem', lineHeight: '1.1', letterSpacing: '-0.02em' },
    h2: { size: '2.25rem', lineHeight: '1.15', letterSpacing: '-0.015em' },
    h3: { size: '1.5rem', lineHeight: '1.25', letterSpacing: '-0.01em' },
    body: { size: '1rem', lineHeight: '1.6', letterSpacing: '0em' },
    caption: { size: '0.8125rem', lineHeight: '1.4', letterSpacing: '0.02em' },
    button: { size: '0.9375rem', lineHeight: '1', letterSpacing: '0.02em' },
  },
  fontWeight: { regular: '400', medium: '500', semibold: '600', bold: '700', black: '900' },
} as const;

export type TypographyScale = keyof typeof typography.fontSize;