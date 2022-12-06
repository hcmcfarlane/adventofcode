import { input } from "./input.js";
import fs from "node:fs";

const testInput = fs.readFileSync("inputtest1.txt", "utf-8", (err, data) => {
  if (err) throw err;
});

function formatTestInput(input) {
  let arr = input.split("\r\n");
  return arr;
}
let streams = formatTestInput(testInput);

function checkDuplicates(position, arr) {
  if (arr.length === 1) {
    return [false, arr.length];
  }
  let i = position - 1;
  if (arr.length < 4) {
    i = arr.length - 1;
  }
  let arrWithBlank = arr
    .slice(0, i)
    .concat([""].concat(arr.slice(i + 1, arr.length)));

  console.log("arr", arr);
  console.log("arrWithBlank", arrWithBlank);
  let duplicate = arrWithBlank.includes(arr[i]);
  let dupeIndex = arrWithBlank.findIndex((n) => n === arr[i]);

  return [duplicate, dupeIndex];
}

function findMarker(datastream) {
  let marker = 0;
  let streamArray = datastream.split("");
  let noDuplicates = [];
  let [duplicate, dupeIndex] = [false, 0];

  checkEach: for (let i = 3; i < datastream.length; i++) {
    // let lengthOfSlice = 4;
    let endOfSlice = i + 1;
    let startOfSlice = i;
    i <= 3
      ? (startOfSlice = 0)
      : (startOfSlice = i + 1 - markerIndicatorLength);

    let currentArray = streamArray.slice(startOfSlice, endOfSlice);

    console.log(`------------\ni = ${i}\ncurrentArray`, currentArray);

    for (
      let j = 1;
      j <= markerIndicatorLength; //|| j < currentArray.length;
      j++
    ) {
      [duplicate, dupeIndex] = checkDuplicates(j, currentArray);
      if (duplicate) {
        continue checkEach;
      } else {
        noDuplicates.push(true);
        // break;
      }
      if (!noDuplicates.includes(false)) {
        marker = i + 1;
        return marker;
      }
    }

    // let [duplicate, dupeIndex] = checkDuplicates(
    //   markerIndicatorLength,
    //   currentArray
    // );

    // if (noDuplicates && i > 3) {
    //   marker = i + 1;
    //   break;
    // }
  }

  return marker;
}

let markerIndicatorLength = 4;

// streams.forEach((stream, index) => {
//   console.log(stream);
//   let mark = findMarker(stream);
//   console.log("mark", mark);
// });
// console.log(streams[0]);
// let mark = findMarker(streams[0]);
// console.log("mark", mark);

console.log(streams[0]);
let mark = findMarker(streams[0]);
console.log("mark", mark);
