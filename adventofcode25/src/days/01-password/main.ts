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

// ***SOLVE***

const timer = new Timer({ label: "timer" });
timer.start();

console.log("SOLVE MODE:: ", solveMode);
console.log("INPUT FILE:: ", inputFile);

console.log("INPUT::");
console.log(input);

timer.stop();
console.log("timer.time()", timer.time());
