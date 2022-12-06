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
// console.log("streams", streams);

function findMarker(datastream) {
  let marker = 0;
  for (let i = 3; i < datastream.length; i++) {
    console.log(i, [
      datastream[i - 3],
      datastream[i - 2],
      datastream[i - 1],
      datastream[i],
    ]);

    if (datastream[i] === datastream[i - 1]) {
      i += 2;
    } else if (datastream[i] === datastream[i - 2]) {
      i += 1;
    } else if (datastream[i] === datastream[i - 3]) {
    } else {
      marker = i + 1;
      break;
    }

    // if (
    //   datastream[i] === datastream[i - 1] ||
    //   datastream[i] === datastream[i - 2] ||
    //   datastream[i] === datastream[i - 3]
    // ) {
    //   marker = marker;
    // } else {
    //   marker = i + 1;
    //   break;
    // }
  }
  return marker;
}

let marker = findMarker(streams[0]);
console.log("marker", marker);
console.log(streams[0].length);
