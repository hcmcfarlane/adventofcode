import fs from "node:fs";
import { Timer } from "timer-node";
import formatTableInput from "../../utils/formatTableInput/formatTableInput";
import {
  pokerSort,
  fiveOfAKind,
  fourOfAKind,
  threeOfAKind,
  twoPair,
  onePair,
  fullHouse,
} from "./pokerhands";
import addArray from "../../utils/addArray/addArray";

const timer = new Timer({ label: "timer" });
timer.start();

const testInput = "./input-test.txt";
const testInput2 = "./input-test-2.txt";
const realInput = "./input.txt";

const useTestInput = true;
const useTestInput2 = false;

const input = fs.readFileSync(
  useTestInput ? (useTestInput2 ? testInput2 : testInput) : realInput,
  {
    encoding: "utf-8",
  }
);

const isRN = false;
const inputArray = formatTableInput(input, isRN);

type HandAndBid = { id: number; hand: string; bid: number }[];
type Ranking = [string, number];
type Rankings = Ranking[];

const handAndRank = inputArray.map((row, idx) => ({
  id: idx,
  hand: row[0],
  bid: parseInt(row[1]),
})) as HandAndBid;

console.log("handAndRank", handAndRank);

// console.log("inputArray", inputArray);

//prettier-ignore
export const sortOrder = [ 'A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];

const calculateRank = (hand: string[]): number => {
  if (fiveOfAKind(hand)) return 7;
  const sortedHand = pokerSort(hand);
  // console.log("sortedHand", sortedHand);

  if (fourOfAKind(sortedHand)) return 6;
  if (fullHouse(sortedHand)) return 5;
  if (threeOfAKind(sortedHand)) return 4;
  if (twoPair(sortedHand)) return 3;
  if (onePair(sortedHand)) return 2;
  return 1;
};

const ranks = handAndRank.map((obj) => [
  obj.hand,
  calculateRank(obj.hand.split("")),
]) as Rankings;
console.log("ranks", ranks);

// find which hand is the strongest by looking at the order of cards according to sortOrder
const findStrongerHand = (hand1: string, hand2: string) => {
  for (let i = 0; i < hand1.length; i++) {
    if (hand1[i] !== hand2[i]) {
      return sortOrder.indexOf(hand2[i]) - sortOrder.indexOf(hand1[i]);
    }
  }
  return undefined;
};

const sortFunction = (a: Ranking, b: Ranking) => {
  return a[1] === b[1]
    ? findStrongerHand(a[0], b[0]) || a[1] - b[1]
    : a[1] - b[1];
};

const sortedHands = ranks.sort((a, b) => sortFunction(a, b));
console.log("sortedHands", sortedHands);

const bidsAndRanks = sortedHands.map((row, index) => {
  const foundHand = handAndRank.find((hand) => hand.hand === row[0]);
  return {
    rank: index + 1,
    hand: foundHand?.hand || 0,
    bid: foundHand?.bid || 0,
  };
});
console.log("bidsAndRanks", bidsAndRanks);

const winnings = bidsAndRanks.map((hand) => hand.rank * hand.bid);
console.log("WINNINGS::", winnings);

const totalWinnings = addArray(winnings);
console.log("totalWinnings", totalWinnings);

// INCORRECT ANSWER FOR INPUT DATA:: 250,087,931

timer.stop();
console.log("timer.time()", timer.time());
