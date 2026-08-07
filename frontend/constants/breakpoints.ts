export const breakpoints = {
  mobile: 375, tablet: 768, laptop: 1024, desktop: 1440, ultrawide: 1920,
} as const;

export const breakpointsPx = {
  mobile: `${breakpoints.mobile}px`,
  tablet: `${breakpoints.tablet}px`,
  laptop: `${breakpoints.laptop}px`,
  desktop: `${breakpoints.desktop}px`,
  ultrawide: `${breakpoints.ultrawide}px`,
} as const;

export type Breakpoint = keyof typeof breakpoints;