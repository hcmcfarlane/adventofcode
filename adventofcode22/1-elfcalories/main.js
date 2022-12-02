import fs from "node:fs";
// let str = "";

function formatInput(string) {
  //   console.log(string);
  //   let regex = /\n/gi;
  //   const formatted = string.replace(regex, "~");
  //   console.log(formatted);
  let sum = [];
  let arr = string.split("\r\n\r\n");
  for (let i = 0; i < arr.length; i++) {
    arr[i] = [arr[i]];
    arr[i] = arr[i][0].split("\r\n").map((x) => Number(x));
    // console.log(arr[i]);
    sum[i] = arr[i].reduce((a, b) => a + b, 0);
  }
  //   console.log("sum", sum);
  return { sum: sum, arr: arr };
}

const str = fs.readFileSync("input.txt", "utf8", (err, data) => {
  if (err) throw err;
  //   console.log("starting read file");
  str = data;
  //   console.log("data", data);
});

// console.log("str", str);
const { sum, arr } = formatInput(str);
// console.log(sum, arr);
// console.log("formatted", formatInput(str));

let maximum = Math.max(...sum);
let maxIndex = sum.findIndex((i) => i === maximum);

// console.log(maxIndex);
// console.log(arr[maxIndex]);

console.log("The maximum value is", maximum);

console.dir(sum, { maxArrayLength: null });

const sumSorted = sum.sort((a, b) => a - b);

// console.log("sum", sum);
console.dir(sum, { maxArrayLength: null });
console.dir(sumSorted, { maxArrayLength: null });

let first = sumSorted[sum.length - 1];
let second = sumSorted[sum.length - 2];
let third = sumSorted[sum.length - 3];

console.log("The first-highest value is", first);
console.log("The second-highest value is", second);
console.log("The third-highest value is", third);

console.log("The total of the top three is", first + second + third);
