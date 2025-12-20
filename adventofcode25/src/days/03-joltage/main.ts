import fs from "node:fs";
import path from "node:path";
import { Timer } from "timer-node";

import {
  addArray,
  formatSingleLineInput,
  getInputPath,
  type SolveMode,
} from "../../utils";

// import {  } from "./helpers";

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

export type Battery = string;

declare global {
  interface Array<T> {
    maxStringOfArray(this: string[], defaultValue?: string): string;
  }
}

Array.prototype.maxStringOfArray = function (this: string[], defaultValue = "0") {
  const arr = this as string[];
  if (arr.length === 0) return defaultValue;
  let m = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > m) m = arr[i];
  }
  return m;
};

const findLargestDigitToRight = (str: string, startIndex: number = 0): string | null => {
      if (startIndex >= str.length) return null;
     return str.slice(startIndex).split("").maxStringOfArray("0");
    }

console.log("SOLVE MODE:: ", solveMode);
console.log("INPUT FILE:: ", inputFile);

// console.log("input", input);

const batteryBank: Battery[] = formatSingleLineInput(input, isRN);
// console.log("batteryBank:: ", batteryBank);

// Find each instance of the largest number in the input, e.g. there are two 9s in [1,3,9,2,9,5]
// Then for each, find the largest number to the RIGHT of it, e.g. 9 -> 9 and 9 -> 5
// Concat to find a number, e.g 99 and 95
// ALso check for the case where the largest number is at the end of the array, e.g. [1,3,9] -> 9
// Find the largest number of all those found numbers
// The inputs are are all positive, non-zero integers.
// Numbers will only be two digits, so smallest possible is 11 and largest possible is 99. 
// The input comes as strings like "139295". Should I convert them to numbers or treat as strings?

// Some examples: 
// In 987654321111111, you can make the largest joltage possible, 98, by turning on the first two batteries.
// In 811111111111119, you can make the largest joltage possible by turning on the batteries labeled 8 and 9, producing 89 jolts.
// In 234234234234278, you can make 78 by turning on the last two batteries (marked 7 and 8).
// In 818181911112111, the largest joltage you can produce is 92.
// Don't give me the answer, just follow my steps as I work through it.

const countFromStart = 0;
const joltageOptions: string[] = [];
const maxBatteryIndices: number[] = [];
let effectiveMaxBattery: string;
let secondLargestBattery: string | undefined;
let joltages: string[] = [];

batteryBank.forEach((battery, idx) => {
  // console.log(`\nProcessing battery #${idx + 1}: ${battery}`);

  const maxBattery = findLargestDigitToRight(battery, countFromStart) ?? "1";
  // console.log("maxBattery:: ", maxBattery);

  const t = maxBattery.charCodeAt(0);
  for (let i = 0; i < battery.length; i++) {
    if (battery.charCodeAt(i) === t) {
      maxBatteryIndices.push(i);
    }
  }

  // console.log("maxBatteryIndices:: ", maxBatteryIndices);

// If maxBattery is only found once, at the end of the string, then it's possible that there's a larger joltage that can be found using the second-largest digit in the string. For example, in a battery like "81119", we can make 89 jolts, even though the largest digit (9) is at the end of the  string.
  // So we need to check for that case specifically.
if (maxBatteryIndices.length === 1 && maxBatteryIndices[0] === battery.length -   1) {
  // Find the second largest battery digit in the string - the assumption is that the largest digit is at the end of the string, so slice(0,-1) takes the   whole string except the last character.
   secondLargestBattery = findLargestDigitToRight(battery.slice(0,-1),  countFromStart) ?? "1";

    // Then, redefine maxBatteryIndices using secondLargestBattery instead.
    const s = secondLargestBattery.charCodeAt(0);
    maxBatteryIndices.length = 0; // Clear the array
    for (let i = 0; i < battery.length; i++) {
      if (battery.charCodeAt(i) === s) {
        maxBatteryIndices.push(i);
      }
    } 
    // console.log("Rechecked maxBatteryIndices:: ", maxBatteryIndices);
  }

  effectiveMaxBattery = secondLargestBattery ?? maxBattery;
  // console.log("effectiveMaxBattery:: ", effectiveMaxBattery);

  maxBatteryIndices.forEach(indexedDigit => {
  // If end of string, findLargestDigitToRight will return null, so default to  empty string so the concat works 
    const nextLargest = findLargestDigitToRight(battery, indexedDigit + 1) || "" ;

  // console.log(`From index ${indexedDigit} (${effectiveMaxBattery}) to right, found next largest: ${nextLargest}`);
    joltageOptions.push(effectiveMaxBattery + nextLargest);
  })

  // console.log("joltageOptions:: ", joltageOptions);

  // Find max of joltageOptions
  const maxJoltage = joltageOptions.maxStringOfArray("0");
  // console.log("maxJoltage:: ", maxJoltage);


  joltages.push(maxJoltage);

  // Clear for next battery
  maxBatteryIndices.length = 0;
  joltageOptions.length = 0;
  secondLargestBattery = undefined; 

});

// console.log("joltages:: ", joltages);

// Sum joltages
// Convert to numbers first then use addArray in utils
const totalJoltage = addArray(joltages.map(j => Number(j)));
console.log("totalJoltage:: ", totalJoltage);

timer.stop();
console.log("timer.time()", timer.time());