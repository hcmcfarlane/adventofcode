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
let streams = formatTestInput(testInput);
console.log("streams", streams);

function findMarker(datastream) {
  let marker = 0;
  for (let i = 3; i < datastream.length; i++) {
    if (
      datastream[i] === datastream[i - 1] ||
      datastream[i] === datastream[i - 2] ||
      datastream[i] === datastream[i - 3]
    ) {
      break;
    } else {
      marker = i;
    }
  }
  return marker;
}

let marker = findMarker(streams[0]);
console.log("marker", marker);
