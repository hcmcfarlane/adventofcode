import { type TNumberRange } from "@utils/index";

// True if s is (x)(x) for some non-empty x.
export const isTwoEqualHalves = (s: string): boolean => {
  const equalHalvesRegex = /^(.+)\1$/;
  return equalHalvesRegex.test(s);
};

export const expandRange = ([start, end]: TNumberRange): number[] => {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};
