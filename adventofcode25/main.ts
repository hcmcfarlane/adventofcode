import fs from "node:fs";
import path from "node:path";

const greet = (name: string): string => `Hello, ${name}!`;
console.log(greet("Hannah"));

// Read booleans from env (default to false)
const solveMode = process.env.INPUT_MODE || "test1";

// const testInput1 = "./input-test-1.txt";
// const testInput2 = "./input-test-2.txt";
// const realInput = "./input.txt";

const testInput1 = "TEST INPUT 1";
const testInput2 = "TEST INPUT 2";
const realInput = "REAL INPUT";

let inputPath: string;
switch (solveMode) {
  case "test1":
    inputPath = testInput1;
    break;
  case "test2":
    inputPath = testInput2;
    break;
  default:
    inputPath = realInput;
}

// const input = fs.readFileSync(path.resolve(inputPath), { encoding: "utf-8" });

console.log("Solve mode:: ", solveMode);
// console.log(`Solve mode: ${solveMode}, using file: ${chosenPath}`);
// console.log(input);
console.log("Input path:: ", inputPath);

// console.log(chosenPath);
