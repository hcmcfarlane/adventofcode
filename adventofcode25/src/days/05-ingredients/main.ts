import fs from "node:fs";
import path from "node:path";
import { Timer } from "timer-node";

import {
  formatSingleLineInput,
  formatRangeInput,
  getInputPath,
  type SolveMode,
} from "../../utils";

import { isIngredientFresh } from "./helpers";

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

const blankLine = isRN ? "\r\n\r\n" : "\n\n";

const [freshProductsInput, ingredientsInput] = input.trim().split(blankLine);

const freshRangesArray = formatRangeInput(
  formatSingleLineInput(freshProductsInput, isRN).join(","),
  "number"
);
// console.log("freshRangesArray::", freshRangesArray);

const ingredientsArray = formatSingleLineInput(ingredientsInput, isRN);
// console.log("ingredientsArray::", ingredientsArray);

let countOfFreshIngredients = 0;

for (const ingredientId of ingredientsArray) {
  const ingredientIdNum = parseInt(ingredientId, 10);
  if (isIngredientFresh(ingredientIdNum, freshRangesArray)) {
    countOfFreshIngredients++;
  }
}

console.log("countOfFreshIngredients::", countOfFreshIngredients);

timer.stop();
console.log("timer.time()", timer.time());
