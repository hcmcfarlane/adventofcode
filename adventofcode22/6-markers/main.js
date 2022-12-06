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

function checkFour(position, four) {
  let i = position - 1;
  let three = four.slice(0, i).concat([""].concat(four.slice(i + 1, 4)));
  let duplicate = three.includes(four[i]);
  let dupeIndex = three.findIndex((n) => n === four[i]);
  //   console.log("\n***i = ", i, "***");
  //   console.log("three", three);
  //   console.log("four", four);
  console.log("duplicate", duplicate);
  console.log("dupeIndex", dupeIndex);

  return [duplicate, dupeIndex];
}

// checkFirstFour(0, ["m", "j", "q", "j"]);
// checkFirstFour(1, ["m", "j", "q", "j"]);
// checkFirstFour(2, ["m", "j", "q", "j"]);
// checkFirstFour(3, ["m", "j", "q", "j"]);

function findMarker(datastream) {
  //   let firstFour = datastream.split("").slice(0, 4);
  //   console.log(datastream);
  //   console.log(firstFour);

  //   if (checkFirstFour(0, firstFour)) {
  //   }
  let marker = 0;
  let streamArray = datastream.split("");

  forLoop: for (let i = 3; i < datastream.length; i++) {
    checkfirstThree: if (i === 3) {
      let firstFour = streamArray.slice(0, 4);
      for (let j = 3; j > 0; j--) {
        let [duplicate, dupeIndex] = checkFour(j, firstFour);
        if (duplicate) {
          if ((j = 2)) {
            if (dupeIndex === 0) {
              continue forLoop;
            }
            if (dupeIndex === 1) {
              i++;
              continue forLoop;
            }
          }
          if ((j = 1)) {
            if (dupeIndex === 0) {
              i++;
              continue forLoop;
            }
          }
        }
      }
    }

    let currentFour = streamArray.slice(i - 3, i + 1);
    console.log(`i = ${i}\ncurrentFour`, currentFour);

    let [duplicate, dupeIndex] = checkFour(4, currentFour);
    if (duplicate) {
      if (dupeIndex === 0) {
        continue forLoop;
      }
      if (dupeIndex === 1) {
        i++;
        continue forLoop;
      }
      if (dupeIndex === 2) {
        i += 2;
        continue forLoop;
      }
    } else {
      marker = i + 1;
      break forLoop;
    }
  }
  return marker;
}

const correctAnswers = [7, 5, 6, 10, 11, 7, 6, 5, 6, 5, 5];
let trues = [];
streams.forEach((stream, index) => {
  let marker = findMarker(stream);
  trues.push(marker === correctAnswers[index]);
  //   console.log("marker", marker, "\n");
  console.log(
    "marker",
    marker,
    `\nShould be: ${correctAnswers[index]}\n ${(
      marker === correctAnswers[index]
    )
      .toString()
      .toUpperCase()}`,
    "\n----------------\n"
  );
});

console.log(trues);

// let marker = findMarker(streams[0]);
// console.log("marker", marker, "\n----------------\n");

// let marker = findMarker(input);
// console.log("marker", marker, "\n");

//   if (
//     datastream[0] === datastream[1] ||
//     datastream[0] === datastream[2] ||
//     datastream[0] === datastream[3] ||
//     datastream[1] === datastream[2] ||
//     datastream[1] === datastream[3] ||
//     datastream[2] === datastream[3]
//   ) {
//     continue;
//   }

// while (i === 3) {
//     if (checkFirstFour(0, firstFour)) {
//         i++
//     } else if (checkFirstFour(1, firstFour)) {
//         i++
//         continue;
//     } else if (checkFirstFour(2, firstFour)) {
//         i++
//         continue;
//     }
// }

// ***BUGGY IF LOOP***
// if (datastream[i] === datastream[i - 1]) {
//   i += 2;
// } else if (datastream[i] === datastream[i - 2]) {
//   i += 1;
// } else if (datastream[i] === datastream[i - 3]) {
// } else if (i === 3) {
//   loop2: if (firstFour.includes(datastream[i - 3])) {
//     // i += 2;
//     console.log("triggered i - 3");
//     break loop2;
//   } else if (firstFour.includes(datastream[i - 2])) {
//     // i++;
//     console.log("triggered i - 2");
//     break loop2;
//   } else if (firstFour.includes(datastream[i - 1])) {
//     // i++;
//     console.log("triggered i - 1");
//     break loop2;
//   } else {
//     console.log("triggered else inside loop `loop`");
//     break loop2;
//   }
// } else {
//   console.log("triggered marker");
//   marker = i + 1;
//   return marker;
// }
