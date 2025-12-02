import fs from "node:fs";
import path from "node:path";
import { Timer } from "timer-node";

import { formatTableInput, getInputPath, type SolveMode } from "../../utils";
// ***SETUP***

const solveMode = (process.env.INPUT_MODE || "test1") as SolveMode;

const baseDir = process.env.ORIGINAL_CWD || process.cwd();
const inputFile = getInputPath(solveMode);

const inputPath = path.join(baseDir, inputFile);
const input = fs.readFileSync(inputPath, { encoding: "utf-8" });

// Type of line endings in input files
const isRN = false;

// ***SOLVE***

const timer = new Timer({ label: "timer" });
timer.start();

console.log("SOLVE MODE:: ", solveMode);
console.log("INPUT FILE:: ", inputFile);

// Use mod 100 to get the digits
// Change input into an array
// Map to numbers and plus/minus operators
// L68 -> ["L", "68"] -> ["-", 68]
// Number starts at 50
// Add or subtract based on the number, but mod 100 to get the digits
// Add the result to an array
// Count number of times we get exactly "0" in the output array

const initArray = formatTableInput(input, isRN);
const splitArray: [string, number][] = initArray.map((arr) => {
  return [arr[0].charAt(0), Number(arr[0].slice(1))];
});
// console.log("splitArray", splitArray);
// const useArray = splitArray.map((arr) => {
//   const plusOrMinus = arr[0] === "L" ? "-" : "+";
//   return [plusOrMinus, Number(arr[1])];
// });

// console.log("useArray", useArray);

const initialDial = 50;
const dialStops: number[] = [initialDial];

// Modify this function so that below 0 rolls over to 99, and over 99 rolls around to 0

let dial = initialDial;
let val = 50;
splitArray.forEach((arr) => {
  if (arr[0] === "L") {
    val -= arr[1];
    dial = (val + 100) % 100;
  } else {
    val += arr[1];
    dial = (val + 100) % 100;
  }
  //   console.log("dial:", dial);
  //   console.log("val:", val);
  val = dial;
  dialStops.push(dial);
});

// console.log("dialStops:: ", dialStops);

const sumZeros = dialStops.filter((num) => num === 0).length;
console.log("***RESULT***");
console.log(sumZeros);

// PART 2
// Count how many times the dial goes past 0
// If the normal plus or minus number is the same as the dial value, then it's NOT gone past zero. If they're different, it's wrapped around

timer.stop();
console.log("timer.time()", timer.time());
