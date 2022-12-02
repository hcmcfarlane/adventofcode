//TEST INPUT RESULTS:
// 1: Rock (A) vs Paper (Y). WIN -> score 8 (2 because you chose Paper + 6 because you won).
// 2: Paper (B) vs Rock (X). LOSS -> score 1 (1 + 0).
// 3: Scissors (C) vs Scissors (Z). DRAW -> score 6 (3 + 3).

import fs from "node:fs";

// console.log("***This is the test version***");

const rps = fs.readFileSync("input.txt", "utf8", (err, data) => {
  // const str = fs.readFileSync("input.txt", "utf8", (err, data) => {
  if (err) throw err;
  // str = data;
  //   console.log("data", data);
});

// console.log("rps", rps);

function formatInput(string) {
  //split into an array
  const arr = string.split("\r\n");
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].split(" ");
  }
  //turn the array into an object
  let obj = {};
  for (let i = 0; i < arr.length; i++) {
    obj[arr[i][0]] = arr[i][1];
  }
  //   console.log("obj", obj);
  return arr;
}
// Rock beats Scissors
// Paper beats Rock
// Scissors beats Paper

// A for Rock, B for Paper, and C for Scissors
// X for Rock, Y for Paper, and Z for Scissors.

// X beats C & draws A & loses B
// Y beats A & draws B & loses C
// Z beats B & draws C & loses A
const RPS = {
  X: ["C", "A", "B"],
  Y: ["A", "B", "C"],
  Z: ["B", "C", "A"],
};

//The grid for calculating shape based on opponent shape
// rock wins scissors Z, draws rock X, loses paper Y
// paper wins rock X, draws paper Y, loses scissors Z
// scissors wins paper Y, draws scissors Z, loses rock X
// [win, draw, lose]
const RPSOPP = {
  A: ["Z", "X", "Y"],
  B: ["X", "Y", "Z"],
  C: ["Y", "Z", "X"],
};
//1 for Rock, 2 for Paper, and 3 for Scissors
const PTS = {
  X: 1,
  Y: 2,
  Z: 3,
};

let sum = 0;
function calculateScore(input) {
  input.forEach((x) => {
    if (RPS[x[1]][0] === x[0]) {
      // win
      // console.log("win");
      sum = sum + 6 + PTS[x[1]];
    } else if (RPS[x[1]][1] === x[0]) {
      // draw
      // console.log("draw");
      sum = sum + 3 + PTS[x[1]];
    } else {
      // lose
      // console.log("else (loss)");
      sum = sum + 0 + PTS[x[1]];
    }
  });
  return sum;
}

//X -> lose, Y -> draw, and Z -> win.
const ACTION = {
  X: "LOSE",
  Y: "DRAW",
  Z: "WIN",
};

function shapeReducer(opponent, outcome) {
  // console.log("opp", opponent);
  // console.log("outcome", outcome);
  let shape = "";
  switch (outcome) {
    case "LOSE":
      //player losing = opponent winning = index 0
      // console.log("reducer, LOSE");
      shape = RPSOPP[opponent][0];
      // console.log(shape);
      break;
    case "DRAW":
      //player drawing = opponent drawing = index 1
      // console.log("reducer, DRAW");
      shape = RPSOPP[opponent][1];
      // console.log(shape);
      break;
    case "WIN":
      //player winning = opponent losing = index 2
      // console.log("reducer, WIN");
      shape = RPSOPP[opponent][2];
      // console.log(shape);
      break;
    default:
      console.log("invalid inputs, probably");
      console.log(shape);
      break;
  }
  return shape;
}

function calculateShape(input) {
  let newInput = [];
  for (let i = 0; i < input.length; i++) {
    // console.log(input[i][0]);
    newInput[i] = [input[i][0], shapeReducer(input[i][0], ACTION[input[i][1]])];
  }
  return newInput;
}

const formatted = formatInput(rps);
// console.log("input", formatted);
// console.log("score", calculateScore(formatted));

const gamePlan = calculateShape(formatted);
// console.log("newInput/gamePlan", gamePlan);

console.log("score with new game plan", calculateScore(gamePlan));
