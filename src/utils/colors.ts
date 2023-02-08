export const COLORS = [
  "red",
  "lime",
  "amber",
  "emerald",
  "teal",
  "cyan",
  "blue",
  "indigo",
  "violet",
  "pink",
] as const;

export type Color = (typeof COLORS)[number];

export const getRandomColor = () => {
  return COLORS[Math.floor(Math.random() * COLORS.length)] as Color;
};

export const AVATARCOLORS = [
  "#AE56FC",
  "#009BFF",
  "#00D3FF",
  "#43FCE6",
  "#CE0CD3",
];

export const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [array[j] as T, array[i] as T];
  }
  return newArray;
};
