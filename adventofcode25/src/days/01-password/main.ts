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

// NOTE: I was incorrectly counting the turns! So if you're on 90 and go R120, I assume that was one hit of zero, but it's actually 2, at t = 10 and t = 110. Not just 1 because it's 1xx. So if the dial number and the non-hundreds part of the dial turn is more than 100 then I add another 0

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

let countOfZeros = 0;

// console.log("split array");
// console.log(splitArray);
console.log("splitArray.length", splitArray.length);

splitArray.forEach((arr, i) => {
  //   console.log("\n");
  //   console.log("i:: ", i, " | arr", arr);
  //   console.log("dialPart2", dialPart2);
  //   console.log("valPart2", valPart2);

  const start = dialPart2;
  const dist = arr[1];

  let zerosDuring: number = 0;
  let endpointZero = false;

  if (arr[0] === "L") {
    // Left: hits zero first at t = s (if d >= s), then every +100 clicks up to d
    // Total zeros including endpoint (if d >= s): 1 + floor((d - s) / 100)

    zerosDuring =
      dist >= start
        ? Math.floor((dist - start) / 100) + (start > 0 ? 1 : 0)
        : 0;

    endpointZero = dist >= start && (dist - start) % 100 === 0;

    // Advance the dial
    valPart2 -= dist;
    dialPart2 = normaliseVal(valPart2);
  } else {
    // "R" case
    // Right: hits zero whenever s + t reaches a multiple of 100 for t in [1..d]
    // Total zeros including endpoint: floor((s + d) / 100)

    zerosDuring = Math.floor((start + dist) / 100);
    endpointZero = (start + dist) % 100 === 0;

    // Advance dial
    valPart2 += dist;
    dialPart2 = normaliseVal(valPart2);
  }

  // Prevent double-counting the endpoint; counted via dialStopsPart2
  if (endpointZero) zerosDuring -= 1;
  countOfZeros += zerosDuring;

  // DEBUG
  // console.log(
  //   `#${i + 1} ${
  //     arr[0]
  //   }${dist} | start=${start} end=${dialPart2} | endpointZero=${endpointZero} | zerosDuringAdded=${
  //     endpointZero ? zerosDuring : zerosDuring
  //   }`
  // );

  // Reset for next line
  valPart2 = dialPart2;
  dialStopsPart2.push(dialPart2);
});

const sumZerosPart2 = dialStopsPart2.filter((num) => num === 0).length;

// console.log("dialStops:: ", dialStopsPart2);

console.log("***SUM ZEROS STOPPED AT***");
console.log(sumZerosPart2);
console.log("**COUNT OF ZEROS GONE PAST***");
console.log(countOfZeros);
console.log("***TOTAL***");
console.log(sumZerosPart2 + countOfZeros);

timer.stop();
console.log("timer.time()", timer.time());
