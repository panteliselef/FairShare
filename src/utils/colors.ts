export const COLORS = [
  "red",
  "orange",
  "amber",
  "emerald",
  "cyan",
  "indigo",
  "pink",
] as const;

export type Color = (typeof COLORS)[number];

export const getRandomColor = () => {
  return COLORS[Math.floor(Math.random() * COLORS.length)] as Color;
};
