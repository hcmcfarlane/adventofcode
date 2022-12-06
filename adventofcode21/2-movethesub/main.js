import fs from "node:fs";

const input = fs.readFileSync("input.txt", "utf8", (err, data) => {
  if (err) throw err;
});

function formatInput(string) {
  let initArr = string.split("\r\n");
  let directions = [];
  for (let i = 0; i < initArr.length; i++) {
    directions[i] = initArr[i].split(" ");
    directions[i][1] = Number(directions[i][1]);
  }
  return directions;
}

let directions = formatInput(input);
// console.log("directions", directions);

let horiz = 0;
let depth = 0;
let aim = 0;

function directionsReducerPartOne(action, distance) {
  switch (action) {
    case "forward":
      horiz += distance;
      break;
    case "down":
      depth += distance;
      break;
    case "up":
      depth -= distance;
      break;
    default:
      console.error("Invalid action");
      break;
  }
}

function directionsReducerPartTwo(action, distance) {
  switch (action) {
    case "forward":
      horiz += distance;
      depth = depth + distance * aim;
      break;
    case "down":
      aim += distance;
      break;
    case "up":
      aim -= distance;
      break;
    default:
      console.error("Invalid action");
      break;
  }
  //   console.log("new horiz", horiz);
  //   console.log("new depth", depth);
  //   console.log("new aim", aim);
}

function calculateMovement(directions) {
  for (let i = 0; i < directions.length; i++) {
    // console.log(`*** ${i} ***`);
    directionsReducerPartTwo(directions[i][0], directions[i][1]);
  }
  console.log("horiz", horiz);
  console.log("depth", depth);
  console.log("aim", aim);
  console.log(horiz * depth);
  return horiz * depth;
}

calculateMovement(directions);
