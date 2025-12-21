import fs from "node:fs";
import path, { format } from "node:path";
import { Timer } from "timer-node";

import {
  getInputPath,
  type SolveMode,
  formatTableInput,
  trimTableInput,
} from "../../utils";

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

console.log("input", input);

const trimmedInput = trimTableInput(input);

console.log("trimmedInput:: ", trimmedInput);

// Remove all double, triple and quadruple spaces from the input and format the input into a 2D array (table). The additional spaces are used to align the columns in the input file, but they are not needed for processing the data.

const mathWorksheetInput = formatTableInput(trimmedInput, isRN);

console.log("mathWorksheetInput", mathWorksheetInput);

// Invert the nested array mathWorksheetInput so that [
//   [ '123', '328', '51', '64' ],
//   [ '45', '64', '387', '23' ],
//   [ '6', '98', '215', '314' ],
//   [ '*', '+', '*', '+' ]
// ]
//  becomes
// [['123', '45', '6', '*'] ...]

// const mathWorksheet = ....something here TODO:

timer.stop();
console.log("timer.time()", timer.time());
