import { type TNumberRange } from "@utils/index";

export const expandRange = ([start, end]: TNumberRange): number[] => {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

export function isIngredientFresh(
  ingredientId: number,
  freshRanges: [number, number][]
): boolean {
  for (const range of freshRanges) {
    const [start, end] = range;
    if (ingredientId >= start && ingredientId <= end) {
      return true;
    }
  }
  return false;
}
