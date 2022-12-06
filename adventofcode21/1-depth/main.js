import fs from "node:fs";

const input = fs.readFileSync("input.txt", "utf8", (err, data) => {
  if (err) throw err;
});

function formatInput(string) {
  let arr = string.split("\r\n");
  let arrNumbers = arr.map((x) => Number(x));
  return arrNumbers;
}

let readings = formatInput(input);
// console.dir(readings, { maxArrayLength: null });
console.log("readings", readings);
// console.log(readings.length);

let count = 0;

function findIncrease(reading1, reading2) {
  if (reading2 > reading1) {
    count++;
  }
  return;
}

function countIncreases(readings, window) {
  for (let i = window; i < readings.length; i++) {
    //for part 1:
    // findIncrease(readings[i - 1], readings[i]);

    //for part 2:
    // let sliding1 = readings[i - 3] + readings[i - 2] + readings[i - 1];
    // let sliding2 = readings[i - 2] + readings[i - 1] + readings[i];

    //for arbitrary sliding window
    let sliding1 = 0;
    let sliding2 = 0;
    for (let j = 0; j < window; j++) {
      sliding2 = sliding2 + readings[i - j];
      sliding1 = sliding1 + readings[i - j - 1];
    }

    // console.log("sliding1", sliding1);
    // console.log("sliding2", sliding2);
    // console.log("after j loop");
    findIncrease(sliding1, sliding2);
  }
  return count;
}

console.log("number of increases", countIncreases(readings, 3));
