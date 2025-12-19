import { type TNumberRange } from "@utils/index";

// True if s is (x)(x) for some non-empty x.
export const isTwoEqualHalves = (s: string): boolean => {
  const equalHalvesRegex = /^(.+)\1$/;
  return equalHalvesRegex.test(s);
};

export const expandRange = ([start, end]: TNumberRange): number[] => {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

/**
 * True if `s` can be formed by repeating some non-empty substring multiple times.
* Let s = "123123". Then:
* s + s = "123123123123"
* (s + s).slice(1, -1) = "23123123123"
* That slice contains "123123" → so s is a repetition ("123" repeated).
*/
export const isRepeatedSubstring = (s: string): boolean => {
  if (!s || s.length < 2) return false;
  // Using the trick: s is a repeated substring iff it appears inside (s + s).slice(1, -1)
  return (s + s).slice(1, -1).includes(s);
};
