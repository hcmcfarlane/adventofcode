import fs from "node:fs";
import { Timer } from "timer-node";
import formatSingleLineInput from "../../utils/formatSingleLineInput/formatSingleLineInput";
import multiplyArray from "../../utils/multiplyArray/multiplyArray";

const timer = new Timer({ label: "timer" });
timer.start();

const testInput = "./input-test.txt";
const testInput2 = "./input-test-2.txt";
const realInput = "./input.txt";

const useTestInput = false;
const useTestInput2 = false;

const input = fs.readFileSync(
  useTestInput ? (useTestInput2 ? testInput2 : testInput) : realInput,
  {
    encoding: "utf-8",
  }
);

const isRN = false;
const inputArray = formatSingleLineInput(input, isRN);

const timeArray = inputArray[0]
  .replaceAll("  ", " ")
  .replaceAll("  ", " ")
  .replaceAll("  ", " ")
  .replace("Time: ", "")
  .split(" ")
  .map((time) => parseInt(time));
const distanceArray = inputArray[1]
  .replaceAll("   ", " ")
  .replaceAll("  ", " ")
  .replaceAll("  ", " ")
  .replace("Distance: ", "")
  .split(" ")
  .map((distance) => parseInt(distance));
console.log("timeArray", timeArray);
console.log("distanceArray", distanceArray);

const calculateRace = (time: number, maxDistance: number): number => {
  // console.log("\n***TIME***", time);
  // console.log("maxDistance:: ", maxDistance);
  let newRecordFwd = maxDistance;
  let millisecMin = 1;
  let millisecMax = time - 1;
  // NOTE: They are always in pairs, i.e. 0 * 7, 7 * 0 then 1 * 6, 6 * 1 then etc...
  for (let i = 1; i < Math.ceil(time / 2); i++) {
    const velocityFwd = i;
    const distanceTravelledFwd = velocityFwd * (time - velocityFwd);

    if (distanceTravelledFwd > newRecordFwd) {
      newRecordFwd = distanceTravelledFwd;
      millisecMin = i;
      millisecMax = time - i;
    }

    // console.log(
    //   "i / time - i / dist::",
    //   `${i} & ${time - i} => ${distanceTravelledFwd}`
    // );

    if (newRecordFwd > maxDistance) break;
  }

  // console.log("millisecMin", millisecMin);
  // console.log("millisecMax", millisecMax);
  // console.log("ways to win", millisecMax - millisecMin + 1);
  const waysToWin = millisecMax - millisecMin + 1;
  return waysToWin;
};

// NOTE: To test individual lines
// for (let j = 0; j < 1; j++) {
//   calculateRace(timeArray[j], distanceArray[j]);
// }
const waysToWinArray = timeArray.map((time, idx) =>
  calculateRace(time, distanceArray[idx])
);

// console.log("waysToWinArray", waysToWinArray);
console.log("multiplyArray(waysToWinArray)", multiplyArray(waysToWinArray));

timer.stop();
console.log("timer.time()", timer.time());
