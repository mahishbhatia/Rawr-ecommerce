import { colors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';
import { radius } from './radius';
import { shadows } from './shadows';
import { durations, easings, transitions } from './animation';
import { breakpoints, breakpointsPx } from './breakpoints';

export const theme = {
  colors, typography, spacing, radius, shadows,
  durations, easings, transitions, breakpoints, breakpointsPx,
} as const;

export default theme;