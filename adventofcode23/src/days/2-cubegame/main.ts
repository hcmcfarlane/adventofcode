import fs from "node:fs";
import formatSingleLineInput from "../../utils/formatSingleLineInput/formatSingleLineInput";
import addArray from "../../utils/addArray/addArray";

type Games = {
  gameNo: number;
  red: number;
  green: number;
  blue: number;
}[];

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

const stringOfGames = formatSingleLineInput(input, true);

const MAX_RED = 12;
const MAX_GREEN = 13;
const MAX_BLUE = 14;

const getGameNumber = (game: string) => {
  return Number(game.split(":")[0].replace("Game ", ""));
};

const formatGames = (games: string[]): Games => {
  const arrayOfGames = [] as Games;

  for (const game in games) {
    // console.log("\n*** NEW GAME ***");
    const thisGame: Games[number] = { gameNo: 0, red: 0, green: 0, blue: 0 };

    const gameNumber = getGameNumber(games[game]);
    thisGame.gameNo = gameNumber;

    const splitSets = games[game].split(": ")[1].split("; ");
    // console.log(splitSets);

    const gameSet = { red: 0, green: 0, blue: 0 };

    for (const set in splitSets) {
      // console.log("`\n!NEW SET");
      const individualSet = splitSets[set]
        .split(", ")
        .map((set) => set.split(" "));
      // console.log(individualSet);
      individualSet.forEach((cubePull) => {
        const colour = cubePull[1] as keyof typeof gameSet;
        const numberOfCubes = Number(cubePull[0]);
        if (numberOfCubes > gameSet[colour]) {
          gameSet[colour] = numberOfCubes;
        }
        // console.log(gameSet);
      });
      thisGame.red = gameSet.red;
      thisGame.blue = gameSet.blue;
      thisGame.green = gameSet.green;
    }

    // console.log(thisGame);
    arrayOfGames.push(thisGame);
  }

  return arrayOfGames;
};

const allGames = formatGames(stringOfGames);
// console.log(allGames);

const arrayOfValidGames: number[] = [];

allGames.forEach((game) => {
  const doesNotExceedMax =
    game.red <= MAX_RED && game.blue <= MAX_BLUE && game.green <= MAX_GREEN;
  if (doesNotExceedMax) arrayOfValidGames.push(game.gameNo);
});

// console.log(arrayOfValidGames);

const result = addArray(arrayOfValidGames);
console.log("RESULT: ", result);

const array = allGames.map((game) => game.red * game.blue * game.green);
console.log(array);

const resultPart2 = addArray(array);
console.log("RESULT PART TWO: ", resultPart2);
