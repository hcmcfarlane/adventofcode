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
