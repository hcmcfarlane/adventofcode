import { input } from "./input.js";
import fs from "node:fs";

const testInput = fs.readFileSync("inputtest.txt", "utf-8", (err, data) => {
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

  //   console.log("arr", arr);
  //   console.log("arrWithBlank", arrWithBlank);
  let duplicate = arrWithBlank.includes(arr[i]);
  let dupeIndex = arrWithBlank.findIndex((n) => n === arr[i]);

  return [duplicate, dupeIndex];
}

function findMarker(datastream) {
  let marker = 0;
  let streamArray = datastream.split("");
  let noDuplicates = [];
  let [duplicate, dupeIndex] = [false, 0];

  checkEach: for (
    let i = markerIndicatorLength - 1;
    i < datastream.length;
    i++
  ) {
    let endOfSlice = i + 1;
    let startOfSlice = i;
    i <= 3
      ? (startOfSlice = 0)
      : (startOfSlice = i + 1 - markerIndicatorLength);

    let currentArray = streamArray.slice(startOfSlice, endOfSlice);

    // console.log(`i = ${i}\ncurrentArray`, currentArray);

    for (let j = 1; j <= markerIndicatorLength; j++) {
      [duplicate, dupeIndex] = checkDuplicates(j, currentArray);
      if (duplicate) {
        continue checkEach;
      } else {
        noDuplicates.push(true);
      }
    }
    if (!noDuplicates.includes(false)) {
      marker = i + 1;
      return marker;
    }
  }

  return marker;
}

let markerIndicatorLength = 14;

let mark = findMarker(input);
console.log("INPUT FILE \nmark", mark, "\n***********\n");

// streams.forEach((stream, index) => {
//   console.log(stream);
//   let mark = findMarker(stream);
//   console.log("mark", mark);
// });
// console.log(streams[0]);
// let mark = findMarker(streams[0]);
// console.log("mark", mark);

// console.log(streams[3]);
// let mark = findMarker(streams[3]);
// console.log("mark", mark);

// const correctAnswers = [7, 5, 6, 10, 11, 7, 6, 5, 6, 5, 5];
const correctAnswers = [19, 23, 23, 29, 26];
let trues = [];
streams.forEach((stream, index) => {
  let mark = findMarker(stream);
  trues.push(mark === correctAnswers[index]);
  //   console.log("marker", marker, "\n");
  console.log(
    stream,
    "\nmark",
    mark,
    `| should be: ${correctAnswers[index]}\n ${(mark === correctAnswers[index])
      .toString()
      .toUpperCase()}`,
    "\n----------------\n"
  );
});

let truth = !trues.includes(false);
console.log("ALL TRUE??", truth);
