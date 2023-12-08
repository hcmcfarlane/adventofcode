import fs from "node:fs";
// import getFromFile from "../../utils/getFromFile/getFromFile";
import formatSingleLineInput from "../../utils/formatSingleLineInput/formatSingleLineInput";

// const input = getFromFile("input-test.txt");

const testInput = "./input-test.txt";
const testInput2 = "./input-test-2.txt";
const realInput = "./input.txt";

const useTestInput = false;
const useTestInput2 = true;

const input = fs.readFileSync(
  useTestInput ? (useTestInput2 ? testInput2 : testInput) : realInput,
  {
    encoding: "utf-8",
  }
);

const calibrationInputs = formatSingleLineInput(input);
// console.log("calibrationInputs", calibrationInputs);

const replacements: Record<string, string> = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
  "1": "1",
  "2": "2",
  "3": "3",
  "4": "4",
  "5": "5",
  "6": "6",
  "7": "7",
  "8": "8",
  "9": "9",
};

const keys = Object.keys(replacements).join("|");
const keysRegex = new RegExp(keys, "i");

const keysBackwards = Object.keys(replacements)
  .join("|")
  .split("")
  .reverse()
  .join("");
// console.log("keysBackwards", keysBackwards);

const keysRegexBkwards = new RegExp(keysBackwards, "i");

const getDigits = (value: string): string => {
  const replacer = (match: string | undefined): string =>
    match ? replacements[match] : "notfound";

  const searchFwds = replacer(value.match(keysRegex)?.[0]);

  const backwards = value.split("").reverse().join("");
  const matcher = backwards.match(keysRegexBkwards)?.[0];
  const searchBkwards = replacer(matcher?.split("").reverse().join(""));

  // const lastFive = value.slice(-5);
  // const newLastFive = lastFive.replaceAll(keysRegex, (match) => replace(match));

  // const newValue = value.slice(0, value.length - 5) + newLastFive;
  // const newValue = value + newLastFive;
  // return newValue.replace(keysRegex, (match) => replace(match));
  return searchFwds + searchBkwards;
};

const findDigits = (value: string): number => {
  // console.log("\n*** VALUE ***", value);
  const updatedValue = getDigits(value);
  // console.log("updatedValue", updatedValue);

  return Number(updatedValue);
};

const calibrationValues = calibrationInputs.map((value) => findDigits(value));

const addDigits = (array: number[]) => {
  return array.reduce((a, b) => a + b, 0);
};

const trebuchetCalibrationValue = addDigits(calibrationValues);

console.log("trebuchetCalibrationValue", trebuchetCalibrationValue);
