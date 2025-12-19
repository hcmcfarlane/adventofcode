import fs from "node:fs";
import path from "node:path";
import { Timer } from "timer-node";

import {
  addArray,
  formatRangeInput,
  getInputPath,
  type SolveMode,
} from "../../utils";

import { expandRange, isRepeatedSubstring, isTwoEqualHalves } from "./helpers";

// ***SETUP***

const solveMode = (process.env.INPUT_MODE || "test1") as SolveMode;

const baseDir = process.env.ORIGINAL_CWD || process.cwd();
const inputFile = getInputPath(solveMode);

const inputPath = path.join(baseDir, inputFile);
const input = fs.readFileSync(inputPath, { encoding: "utf-8" });

// Type of line endings in input files
const isRN = false;

// ***SOLVE***

// ***PART 1***

const timer = new Timer({ label: "timer" });
timer.start();

console.log("SOLVE MODE:: ", solveMode);
console.log("INPUT FILE:: ", inputFile);

// console.log("input", input);

const ranges = formatRangeInput(input, "number");
// console.log("ranges:: ", ranges);

// Get all valid numbers from the ranges
// Then flatten the map
// Then convert back to strings to run the isTwoEqualHalves util

const allNumbers = ranges
  .map((range) => expandRange(range))
  .flat()
  .map((num) => num.toString());

console.log("allNumbers.length:: ", allNumbers.length);

let invalidProductIds: number[] = [];

allNumbers.forEach((num) => {
  // If the number has two equal halves then it is an invalid productID
  //   Push invalid IDs to array as a number
  
  // PART 1 check:
  // const isInvalidProductId = isTwoEqualHalves(num);

  // PART 2 check:
  const isInvalidProductId = isRepeatedSubstring(num);
  
  if (isInvalidProductId) {
    invalidProductIds.push(Number(num));
  }
});

// console.log("invalidProductIds:: ", invalidProductIds);
console.log("invalidProductIds.length:: ", invalidProductIds.length);

const sumOfInvalidProductIds = addArray(invalidProductIds);

console.log("sumOfInvalidProductIds:: ", sumOfInvalidProductIds);

timer.stop();
console.log("timer.time()", timer.time());
