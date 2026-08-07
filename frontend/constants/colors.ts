export const colors = {
  primary: { DEFAULT: '#14110F', hover: '#1F1B18', active: '#0A0806' },
  secondary: { DEFAULT: '#E8DCCB', hover: '#DED0BB', active: '#D2C1A6' },
  accent: { DEFAULT: '#F15A24', hover: '#FF733F', active: '#D6491A' },
  success: { DEFAULT: '#2ECC71', hover: '#3DDA80', active: '#25A85B' },
  warning: { DEFAULT: '#F5A623', hover: '#FFB63F', active: '#D8900F' },
  danger: { DEFAULT: '#E74C3C', hover: '#F0685A', active: '#C93B2C' },
  neutral: {
    50: '#FAFAF9', 100: '#F0EEEB', 200: '#DAD6CF', 300: '#B8B2A7', 400: '#8F887C',
    500: '#6B655A', 600: '#4C463D', 700: '#332F29', 800: '#211E1A', 900: '#14110F',
  },
  surface: { DEFAULT: '#1B1714', raised: '#242019', sunken: '#0A0806' },
  background: { DEFAULT: '#14110F', inverse: '#E8DCCB' },
  text: { DEFAULT: '#E8DCCB', inverse: '#14110F', muted: '#B8B2A7', disabled: '#6B655A' },
  border: { DEFAULT: '#2A2620', strong: '#3D372E', subtle: '#1F1B18' },
} as const;

export type ColorGroup = keyof typeof colors;