// 2-4,6-8
// 2-3,4-5
// 5-7,7-9
// 2-8,3-7
// 6-6,4-6
// 2-6,4-8

// convert data to an array of form
// [[a, b, c, d], [e, f, g, h]...]
// as Numbers not strings
// Find whether b - a is larger than d - c
// If b - a is bigger (i.e. more sections)
//    then check if b > d && a < c
// If d - c is bigger
//   then check if d > b && c < a
// if so then the smaller set is FULLY CONTAINED
// add to a count

import fs from "node:fs";

const input = fs.readFileSync("inputtest.txt", "utf8", (err, data) => {
    if (err) throw err;
  });
function formatInput(string) {
    const arr = string.split("\r\n");

    for (let i = 0; i < arr.length; i++) {
       arr[i] = arr[i].replaceAll(",", " ").replaceAll("-", " ").split(" ").map(j => Number(j));
    }
  
    return arr;
}
let list = formatInput(input);
// console.log("list", list)


function findFullyContained (set) {
    // console.log(set)
    // console.log("b - a", set[1] - set[0])
    // console.log("d - c",set[3] - set[2])
    let returnVal = true;
    if (set[1] - set[0] >= set[3] - set[2]) {
        set[1] >= set[3] && set[0] <= set[2] ? returnVal : returnVal = false;
    } else {
        set[3] >= set[1] && set[2] <= set[0] ? returnVal : returnVal = false;
    }
    return returnVal;
}

function findAnyOverlap(set) {
    // [a, b, c, d]
    // if c <= b && d >= b then there is an overlap
    let isOverlap = true;
    set[2] <= set[1] && set[3] >= set[0] ? isOverlap : isOverlap = false;
    return isOverlap
}

let count = 0;
// let shortList = list.slice(0,5);
// shortList.map(l => findFullyContained(l) ? count++ : count)
list.map(l => findFullyContained(l) ? count++ : count)

console.log("count (number of overlapping pairs):", count)

list.map(l => console.log("is there overlap", findAnyOverlap(l)))
