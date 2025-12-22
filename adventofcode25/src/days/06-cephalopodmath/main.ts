import fs from "node:fs";
import path, { format } from "node:path";
import { Timer } from "timer-node";

import {
  getInputPath,
  type SolveMode,
  formatTableInput,
  trimTableInput,
  addArray,
} from "../../utils";
import { doArithmetic } from "./helpers";

// import { } from "./helpers";

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

const trimmedInput = trimTableInput(input);

const mathWorksheetInput = formatTableInput(trimmedInput, isRN);

// Transpose the array mathWorksheetInput
const mathWorksheet = mathWorksheetInput[0].map((_, colIndex) =>
  mathWorksheetInput.map((row) => row[colIndex])
);

const cephalopodMathWorksheet = mathWorksheet.map((row) => {
  let maxLength = 0;
  const entries = row.slice(0, -1);
  const numberOfEntries = entries.length;
  console.log(`\n ***Entries ${entries}`);

  for (const entry of entries) {
    if (entry.length > maxLength) {
      maxLength = entry.length;
    }
  }

  let newRowArray = [];
  //   Loop through each entry to redefine it
  for (let i = 0; i < numberOfEntries; i++) {
    const entry = entries[i];
    console.log(`\nAt entry ${i}: ${entry}`);
    let newEntryArray: string[] = [];
    // for (let j = 0; j < maxLength; j++) {
    //   console.log(`\nAt char ${j} of entry: ${entries[i][j]}`);
    //   // Returns empty string "" if out of bounds
    //   const getChar = entries[i][j]?.charAt(maxLength - 1 - 0);
    //   const newChar = getChar || "";
    //   newEntryArray.push(newChar);
    // }
    // console.log(`At entry ${i}, newEntry = ${newEntryArray} `);

    // Reconstruct entry 0 -> i:
    // Char 0 = last char of entry 0 -> i (3)
    // Char 1 = last char of entry 1 -> i + 1 (5)
    // Char 2 = last char of entry 2 -> i + 2 (6)... and so on
    // Entry 1:
    // Char 0 = second-lsat char of entry 0 (2)
    // Char 1 = second-last char of entry 1 (4)
    // Char 2 = second-last char of entry 2 (undefined -> '' -> ignore)
    // Entry 2:
    // Char 0 - third-last char of entry 0 (1)
    // Char 1 = third-last char of entry 1 (ignore)
    // Char 2 = third-last char of entry 2 (ignore)

    // NOTE: I think I need to put the maxLength array on the outside, and get all the first chars, then all the second chars, ... rather than get chars 0, 1 and 2 for the first entry, then 0,1,2 for the second entry.. and so on

    // We run the loop for the maximum possible number length rather than over the length of the first entry
    for (let j = 0; j < maxLength; j++) {
      console.log(`Char ${j} of maxLength ${maxLength}`);
      // If out of bounds, set to empty string '' (falsey) so we can reduce later
      const getChar = entry[maxLength - 1 - j] || "";
      console.log("getChar", getChar);
      newEntryArray.push();
    }
    newRowArray.push(newEntryArray);
    console.log("newEntryArray::", newEntryArray);
  }
  console.log("newRowArray:: ", newRowArray);
});

console.log("mathWorksheet\n", mathWorksheet);

// Finally, the leftmost problem is 356 * 24 * 1 = 8544
// The third problem from the right is 8 + 248 + 369 = 625
// The second problem from the right is 175 * 581 * 32 = 3253600
// The rightmost problem is 4 + 431 + 623 = 1058

const answers = mathWorksheet.map((row) => {
  const digits = row.map((num) => Number(num)).slice(0, -1);
  const operator = row[row.length - 1];

  return doArithmetic(operator, digits);
});

console.log("answers:: ", answers);

const grandTotalOfAnswers = addArray(answers);
console.log("grandTotalOfAnswers:: ", grandTotalOfAnswers);

timer.stop();
console.log("timer.time()", timer.time());
