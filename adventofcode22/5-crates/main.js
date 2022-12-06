import { crates } from "./crates.js";
import fs from "node:fs";
// console.log(crates);

const movesList = fs.readFileSync("input.txt", "utf-8", (err, data) => {
  if (err) throw err;
});

function formatInput(string) {
  const arr = string
    .replaceAll("move ", "")
    .replaceAll("from ", "")
    .replaceAll("to ", "")
    .split("\r\n");

  let arrOfArrs = [];
  for (let i = 0; i < arr.length; i++) {
    arrOfArrs[i] = arr[i].split(" ");
  }

  let moves = [];
  for (let i = 0; i < arrOfArrs.length; i++) {
    moves[i] = {
      number: arrOfArrs[i][0],
      from: arrOfArrs[i][1],
      to: arrOfArrs[i][2],
    };
  }

  return moves;
}
const moves = formatInput(movesList);
// console.log("list of moves", moves);

function moveCrates(crates, numToMove, fromCrate, toCrate) {
  const from = fromCrate - 1;
  const to = toCrate - 1;
  if (numToMove === 1) {
    let c = crates[from][crates[from].length - 1];
    crates[from].pop();
    crates[to].push(c);
  } else {
    let movingCrates = crates[from].slice(
      crates[from].length - numToMove,
      crates[from].length
    );
    // console.log(movingCrates);

    //pop off the moved crates one-by-one
    let n = 0;
    while (n < numToMove) {
      crates[from].pop();
      n++;
    }
    // 1️⃣ FOR PART ONE
    //push the moved crates one-by-one (from the top!)
    // for (let k = movingCrates.length - 1; k >= 0; k--) {
    //   crates[to].push(movingCrates[k]);
    // }

    // 2️⃣ FOR PART TWO:
    //push the moved crates all at once
    crates[to].push(...movingCrates);
  }
  return crates;
}

moves.forEach(
  (move) =>
    //   console.log(
    // "updated crates",
    moveCrates(crates, move.number, move.from, move.to)
  //   )
);

function findLastCrate(crates) {
  let finals = [];
  crates.forEach((crate) => finals.push(crate[crate.length - 1]));
  return finals.join("");
}

console.log("final crates", findLastCrate(crates));

// SPLICE modifies, SLICE does not modify
// POP and PUSH modify
