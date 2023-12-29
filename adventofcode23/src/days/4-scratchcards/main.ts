import fs from "node:fs";
import formatSingleLineInput from "../../utils/formatSingleLineInput/formatSingleLineInput";
import formatTableInput from "../../utils/formatTableInput/formatTableInput";
import addArray from "../../utils/addArray/addArray";

const testInput = "./input-test.txt";
const testInput2 = "./input-test-2.txt";
const realInput = "./input.txt";

const useTestInput = false;
const useTestInput2 = false;

const input = fs.readFileSync(
  useTestInput ? (useTestInput2 ? testInput2 : testInput) : realInput,
  {
    encoding: "utf-8",
  }
);

const isRN = true;
const inputArray = formatSingleLineInput(input, isRN);

// pull out card no.
// split into two arrays of winning and received numbs
// for each in received, check if in winning
// put each winning received in an array
// answer for each card is 2 to the power of (length of array - 1)

const getPoints = (numberOfWinners: number) => {
  if (numberOfWinners === 0) return 0;
  return 2 ** (numberOfWinners - 1);
};

const splitOutNumbers = (string: string) => {
  return string
    .trim()
    .replaceAll("  ", " ")
    .split(" ")
    .map((num) => Number(num));
};

type Card = {
  index: number;
  winning: number[];
  received: number[];
  winners: number[];
};
type Cards = Card[];

const cards = [] as Cards;

inputArray.forEach((line) => {
  const splitCard = line.split(/[:|]/);
  const cardNo = Number(
    splitCard[0].replaceAll("  ", " ").replace("Card ", "")
  );
  const winningNos = splitOutNumbers(splitCard[1]);
  const receivedNos = splitOutNumbers(splitCard[2]);

  const card = {
    index: cardNo,
    winning: winningNos,
    received: receivedNos,
    winners: [],
  } as Card;
  cards.push(card);
});

const points: number[] = [];
const copies: number[] = new Array(cards.length).fill(1);

cards.forEach((card, idx) => {
  //   console.log(`\n *** CARD ${card.index}, idx: ${idx}`);
  card.received.forEach((recNum) => {
    if (card.winning.includes(recNum)) {
      card.winners.push(recNum);
    }
  });
  const winningCards = card.winners.length;
  //   console.log("Winning cards: ", winningCards);
  for (let i = idx + 1; i <= idx + winningCards; i++) {
    // console.log("i", i);
    copies[i] = copies[i] + 1 * copies[idx];
  }
  //   console.log(copies);
  // const pointTotal = getPoints(card.winners.length);
  // points.push(pointTotal);
});

// console.log("TOTAL POINTS = ", addArray(points));

const totalCopies = addArray(copies);
console.log("TOTAL COPIES", totalCopies);
