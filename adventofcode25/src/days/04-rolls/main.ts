import fs from "node:fs";
import path from "node:path";
import { Timer } from "timer-node";

import {
  addArray,
  formatSingleLineInput,
  getInputPath,
  type SolveMode,
} from "../../utils";

import { countSurroundingAts } from "./helpers";

// ***SETUP***

const solveMode = (process.env.INPUT_MODE || "test1") as SolveMode;

const baseDir = process.env.ORIGINAL_CWD || process.cwd();
const inputFile = getInputPath(solveMode);

const inputPath = path.join(baseDir, inputFile);
const input = fs.readFileSync(inputPath, { encoding: "utf-8" });

// Type of line endings in input files
const isRN = true;

// ***SOLVE***

const timer = new Timer({ label: "timer" });
timer.start();

console.log("SOLVE MODE:: ", solveMode);
console.log("INPUT FILE:: ", inputFile);

export const rollChar = "@";
const maxRollsSurrounding = 4;

const rollsArray: string[][] = formatSingleLineInput(input, isRN).map((line) =>
  line.split("")
);
// console.log("rollsArray:: ", rollsArray);

// A deep copy function for nested arrays.
const deepCopyArray = (array: any[][]): any[][] => {
  return array.map((row) => [...row]);
};

let countOfAts = 0;
let countOfLessThanMaxRolls = 0;
let currentRollsArray = deepCopyArray(rollsArray); // The current array to be processed
let nextRollsArray = deepCopyArray(rollsArray); //The next array to be processed
let totalRollsRemovedArray: number[] = [];
let totalRollsRemoved: number = 0;

// Now, each time that countOfLessThanMaxRolls is > 0, we will set currentRollsArray to nextRollsArray, reset nextRollsArray to a copy of currentRollsArray, and reset countOfLessThanMaxRolls to 0, and repeat the process, until countOfLessThanMaxRolls is 0.
// First, turn the loops below into a function that can be called repeatedly until countOfLessThanMaxRolls is 0.

const processRollsArray = (rollsArray: string[][]) => {
  rollsArray.forEach((row, y) => {
    // console.log(`\n\n Row ${y}:: ${row.join("")}`);
    row.forEach((item, x) => {
      // We only need to count surrounding "@" for items that are "@"
      if (item !== rollChar) return;
      const surroundingAts = countSurroundingAts(x, y, rollsArray);
      //   console.log(
      // `Item at (${x}, ${y}) = ${item} has ${surroundingAts} surrounding "@" characters.`
      //   );
      countOfAts++;
      if (surroundingAts < maxRollsSurrounding) {
        countOfLessThanMaxRolls++;
        // console.log(
        //   `--> It has LESS than ${maxRollsSurrounding} surrounding "@" characters.`
        // );
      }

      // Now for each "@" item with less than maxRollsSurrounding, we log its position. After the whole loop is processed, we will use these positions to change those "@" to "." in a new array, which we will call currentRollsArray.
      if (surroundingAts < maxRollsSurrounding) {
        // console.log(`Item at (${x}, ${y}) = ${item} will be changed to "." in nextRollsArray.`);
        nextRollsArray[y][x] = ".";
      }
    });
  });

  totalRollsRemovedArray.push(countOfLessThanMaxRolls);
  totalRollsRemoved = addArray(totalRollsRemovedArray);
  //   console.log(totalRollsRemovedArray);
  //   console.log(`totalRollsRemoved:: ${totalRollsRemoved}`);
};

// Initial processing
processRollsArray(currentRollsArray);

// Now perform the loop until countOfLessThanMaxRolls is 0 - that is, until there are no more "@" with less than maxRollsSurrounding surrounding "@".

while (countOfLessThanMaxRolls !== 0) {
  // Reset counters for the while loop. We reset countOfLessThanMaxRolls at the top of the loop so that the while condition can be checked correctly.
  currentRollsArray = deepCopyArray(nextRollsArray);
  countOfLessThanMaxRolls = 0;

  //   Perform the loop
  processRollsArray(currentRollsArray);
}

// Final output
console.log("total rolls removed:: ", totalRollsRemoved);

// console.log(
//   `Number of '@' items with less than ${maxRollsSurrounding} surrounding '@': `,
//   countOfLessThanMaxRolls
// );

timer.stop();
console.log("timer.time()", timer.time());
