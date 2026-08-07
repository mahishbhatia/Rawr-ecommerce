export const durations = { fast: 0.15, medium: 0.3, slow: 0.6, page: 0.8 } as const;

export const easings = {
  default: [0.4, 0, 0.2, 1] as [number, number, number, number],
  smooth: [0.22, 1, 0.36, 1] as [number, number, number, number],
  sharp: [0.4, 0, 0.6, 1] as [number, number, number, number],
} as const;

export const transitions = {
  hover: { duration: durations.fast, ease: easings.default },
  button: { duration: durations.fast, ease: easings.sharp },
  page: { duration: durations.page, ease: easings.smooth },
  reveal: { duration: durations.slow, ease: easings.smooth },
} as const;