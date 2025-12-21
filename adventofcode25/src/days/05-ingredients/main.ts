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

// Get two arrays from the input, one for the IDs of fresh products, and one for the IDs of ingredients in stock. The two arrays are split by a blank line in the input file.

const blankLine = isRN ? "\r\n\r\n" : "\n\n";

const [freshProductsInput, ingredientsInput] = input.trim().split(blankLine);

const freshRangesArray = formatRangeInput(
  formatSingleLineInput(freshProductsInput, isRN).join(","),
  "number"
);
// console.log("freshRangesArray::", freshRangesArray);

const ingredientsArray = formatSingleLineInput(ingredientsInput, isRN);
// console.log("ingredientsArray::", ingredientsArray);

// Now expand the ranges of fresh product IDs into a single array of IDs
//  This code is breaking because for an array of ingredients that is very large, the allFreshProductIds array becomes too large and causes memory issues.
// To fix this, we can check each ingredient ID against the ranges directly instead of expanding all ranges into a large array.

let countOfFreshIngredients = 0;

for (const ingredientId of ingredientsArray) {
  const ingredientIdNum = parseInt(ingredientId, 10);
  if (isIngredientFresh(ingredientIdNum, freshRangesArray)) {
    countOfFreshIngredients++;
  }
}

// Alternative approach that causes memory issues for large inputs

// const allFreshProductIds = freshRangesArray
//   .map((range) => expandRange(range))
//   .flat()
//   .map((num) => num.toString());
// // console.log("allFreshProductIds::", allFreshProductIds);

// let countOfFreshIngredients = 0;
// for (const ingredientId of ingredientsArray) {
//   if (allFreshProductIds.includes(ingredientId)) {
//     // console.log(`${ingredientId} is fresh`);
//     countOfFreshIngredients++;
//   }
//   //   else {
//   //     console.log(`${ingredientId} is spoiled`);
//   //   }
// }

console.log("countOfFreshIngredients::", countOfFreshIngredients);

timer.stop();
console.log("timer.time()", timer.time());
