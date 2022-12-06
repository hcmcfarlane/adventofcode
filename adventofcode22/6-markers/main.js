import { input } from "./input.js";
import fs from "node:fs";
// console.log(crates);

const testInput = fs.readFileSync("inputtest1.txt", "utf-8", (err, data) => {
  if (err) throw err;
});

function formatTestInput(input) {
  let arr = input.split("\r\n");
  return arr;
}
let strings = formatTestInput(testInput);
console.log("strings", strings);
