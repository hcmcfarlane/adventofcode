import fs from "node:fs";
import path from "node:path";
import { Timer } from "timer-node";

import {
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


const rollsArray: string[][] = formatSingleLineInput(input, isRN).map((line) => line.split(""));

// console.log("rollsArray:: ", rollsArray);

let count = 0;
let countOfLessThanMaxRolls = 0;

rollsArray.forEach((row, y) => {
    // console.log(`\n Row ${y}:: ${row.join("")}`);
  row.forEach((item, x) => {
    // We only need to count surrounding "@" for items that are "@"
    if (item !== rollChar) return;
    const surroundingAts = countSurroundingAts(x, y, rollsArray)
    // console.log(`Item at (${x}, ${y}) = ${item} has ${surroundingAts} surrounding "@" characters.`);
    count++
    if (surroundingAts < maxRollsSurrounding) {
      countOfLessThanMaxRolls++;
    //   console.log(`--> It has LESS than ${maxRollsSurrounding} surrounding "@" characters.`);
    }
  });
});

console.log(`Number of '@' items with less than ${maxRollsSurrounding} surrounding '@': `, countOfLessThanMaxRolls);


timer.stop();
console.log("timer.time()", timer.time());