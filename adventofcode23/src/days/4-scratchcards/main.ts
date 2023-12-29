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
// console.log(inputArray);

// const inputTable = formatTableInput(input);
// console.log(inputTable);

// pull out card no.
// split into two arrays of winning and received numbs
// for each in received, check if in winning
// put each winning received in an array
// answer for each card is 2 to the power of (length of array - 1)

const getPoints = (numberOfWinners: number) => {
  if (numberOfWinners === 0) return 0;
  return 2 ** (numberOfWinners - 1);
};

type Card = {
  index: number;
  winning: string[];
  received: string[];
  winners: string[];
};
type Cards = Card[];

const cards = [] as Cards;

inputArray.forEach((line) => {
  //   const splitCard = card.split(":").split("|");
  const splitCard = line.split(/[:|]/);
  //   console.log(splitCard);
  const cardNo = Number(
    splitCard[0].replaceAll("  ", " ").replace("Card ", "")
  );
  const winningNos = splitCard[1].trim().replaceAll("  ", " ").split(" ");
  // .map((num) => Number(num)); // UNCOMMENT THIS TO MAKE NUMBERS NOT STRINGS
  const receivedNos = splitCard[2].trim().replaceAll("  ", " ").split(" ");
  // .map((num) => Number(num)); // UNCOMMENT THIS TO MAKE NUMBERS NOT STRINGS

  const card = {
    index: cardNo,
    winning: winningNos,
    received: receivedNos,
    winners: [],
  } as Card;
  cards.push(card);
});

const points: number[] = [];

cards.forEach((card) => {
  //   console.log(`\n *** CARD ${card.index}`);
  //   console.log(card.winning);
  //   console.log(card.received);
  card.received.forEach((recNum) => {
    if (card.winning.includes(recNum)) {
      card.winners.push(recNum);
    }
    // console.log(card.winners);
  });
  const pointTotal = getPoints(card.winners.length);
  points.push(pointTotal);

  //   console.log("Winners length: ", card.winners.length);
  //   console.log("Points: ", pointTotal);
});

// console.log("points array", points);

console.log("TOTAL POINTS = ", addArray(points));
