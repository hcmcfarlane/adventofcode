import fs from "node:fs";
import path from "node:path";
import { Timer } from "timer-node";

import { formatTableInput, getInputPath, type SolveMode } from "../../utils";

import { normaliseVal } from "./helpers";
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
// console.log("***RESULT***");
// console.log(sumZeros);

// PART 2
// Count how many times the dial goes past 0
// If the normal plus or minus number is the same as the dial value, then it's NOT gone past zero. If they're different, it's wrapped around
console.log("\r\n");
console.log("***PART 2***");

let maxDialTurn = -Infinity;
for (let i = 0; i < splitArray.length; i++) {
  if (splitArray[i][1] > maxDialTurn) {
    maxDialTurn = splitArray[i][1];
  }
}
console.log("maxDialTurn", maxDialTurn);

let minDialTurn = +Infinity;
for (let i = 0; i < splitArray.length; i++) {
  if (splitArray[i][1] < minDialTurn) {
    minDialTurn = splitArray[i][1];
  }
}
console.log("minDialTurn", minDialTurn);

const dialStopsPart2: number[] = [initialDial];

let dialPart2: number = initialDial; // Use for tracking the final dial position at the end of each rotation
let valPart2 = initialDial; // Use for tracking the intermediate dial value, before we do the modulo 100 operation
let isOnZero: boolean = false;
let hundredsDigit: number = 0;

let countOfZeros = 0;

// console.log("split array");
// console.log(splitArray);
console.log("splitArray.length", splitArray.length);

splitArray.forEach((arr, i) => {
  //   console.log("\n");
  //   console.log("i:: ", i, " | arr", arr);
  //   console.log("dialPart2", dialPart2);
  //   console.log("valPart2", valPart2);

  isOnZero = dialPart2 === 0;
  hundredsDigit = Math.floor(Math.abs(arr[1]) / 100);

  //  f the dial turn is more than 200 it will go past 0 more than once
  // One of those times is already counted (i.e. when it goes past 0 when the turn is between 0 and 199, counted in the L:past zero if/else part)
  if (hundredsDigit > 1) {
    countOfZeros = countOfZeros + hundredsDigit - 1;
  }

  if (arr[0] === "L") {
    valPart2 -= arr[1];
    dialPart2 = normaliseVal(valPart2);
    // console.log("after calc");
    // console.log("dialPart2", dialPart2);
    // console.log("valPart2", valPart2);

    // If the final dial number and the intermediate val are NOT the same, then a modulo has happened, and the dial has gone past zero, but do not count zero twice, i.e. if dial = 99 and the rotation is R1, we end up on 0, which is already sent to the dialStops array so we do not need to increase countOfZeros
    // If the amount we turn by is less than 100 and we started on 0, we can never hit zero again, so we skip the logic to count a turn past zero
    if (isOnZero && arr[1] < 100) {
      //   console.log("skipping countOfZeros");
    } else {
      if (valPart2 !== dialPart2 && dialPart2 !== 0) {
        // console.log("L: past zero");
        countOfZeros++;
        // console.log("countOfZeros", countOfZeros);
      }
    }
  } else {
    valPart2 += arr[1];
    dialPart2 = normaliseVal(valPart2);
    // console.log("after calc");
    // console.log("dialPart2", dialPart2);
    // console.log("valPart2", valPart2);

    if (isOnZero && arr[1] < 100) {
      //   console.log("skipping countOfZeros");
    } else {
      if (valPart2 !== dialPart2 && dialPart2 !== 0) {
        // console.log("R: past zero");
        countOfZeros++;
        // console.log("countOfZeros", countOfZeros);
      }
    }
  }
  valPart2 = dialPart2;

  //   console.log(
  //     `Pushing to dialStopsPart2: dialPart2=${dialPart2}, valPart2=${valPart2}`
  //   );
  dialStopsPart2.push(dialPart2);
});

const sumZerosPart2 = dialStopsPart2.filter((num) => num === 0).length;

console.log("dialStops:: ", dialStopsPart2);

console.log("***SUM ZEROS STOPPED AT***");
console.log(sumZerosPart2);
console.log("**COUNT OF ZEROS GONE PAST***");
console.log(countOfZeros);
console.log("***TOTAL***");
console.log(sumZerosPart2 + countOfZeros);

timer.stop();
console.log("timer.time()", timer.time());
