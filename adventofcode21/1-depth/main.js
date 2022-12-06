import fs from "node:fs";

const input = fs.readFileSync("inputtest.txt", "utf8", (err, data) => {
  if (err) throw err;
});

function formatInput(string) {
  let arr = string.split("\r\n");
  let arrNumbers = arr.map((x) => Number(x));
  return arrNumbers;
}

let readings = formatInput(input);
console.dir(readings, { maxArrayLength: null });
console.log(readings.length);

let count = 0;

function findIncrease(reading1, reading2) {
  if (reading2 > reading1) {
    count++;
  }
  return;
}

function countIncreases(readings) {
  let window = 3;
  for (let i = window * 2 - 1; i < readings.length; i++) {
    //for part 1:
    // findIncrease(readings[i - 1], readings[i]);
    //for part 2:
    findIncrease(
      readings[i - 5] + readings[i - 4] + readings[i - 3],
      readings[i - 2] + readings[i - 1] + readings[i]
    );
    //for arbitrary sliding window
    // let sliding1 = 0;
    // let sliding2 = 0;
  }
  return count;
}

console.log("number of increases", countIncreases(readings));
