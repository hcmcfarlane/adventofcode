import { sortOrder } from "./main";

export const pokerSort = (hand: string[]): string[] => {
  return hand.sort((a, b) => sortOrder.indexOf(a) - sortOrder.indexOf(b));
};

export const fiveOfAKind = (array: string[]): boolean => {
  return array.every((card) => card === array[0]);
};

export const fourOfAKind = (sortedHand: string[]): boolean => {
  return sortedHand.some(
    (card, index) =>
      card === sortedHand[index + 1] &&
      card === sortedHand[index + 2] &&
      card === sortedHand[index + 3]
  );
};

export const threeOfAKind = (sortedHand: string[]): boolean => {
  return sortedHand.some(
    (card, index) =>
      card === sortedHand[index + 1] && card === sortedHand[index + 2]
  );
};

export const twoPair = (sortedHand: string[]): boolean => {
  return (
    sortedHand
      .slice(0, 2)
      .some((card, index) => card === sortedHand[index + 1]) &&
    sortedHand.slice(2, 5).some((card, index) => card === sortedHand[index + 1])
  );
};

export const fullHouse = (sortedHand: string[]): boolean => {
  const filter = sortedHand.filter(
    (card, index) =>
      card === sortedHand[index + 1] && card === sortedHand[index + 2]
  );
  const threeOfAKindFilteredOut = sortedHand.filter(
    (card) => !filter.includes(card)
  );
  return threeOfAKind(sortedHand) && onePair(threeOfAKindFilteredOut);
};

export const onePair = (hand: string[]): boolean => {
  return hand.some((card, index) => card === hand[index + 1]);
};
