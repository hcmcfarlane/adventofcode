import fs from "node:fs";
import formatSingleLineInput from "../../utils/formatSingleLineInput/formatSingleLineInput";
import addArray from "../../utils/addArray/addArray";

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

const inputArray = formatSingleLineInput(input, true);
// console.log(inputArray);

// in each line, look for a number -
// number is either digit at start of line with digit next to a period/symbol,
// or starts with a period/symbol to the left and ends with period/symbol to the right
// or starts with period/symbol to the left and ends with digit at end of line
// for each number, check if there's a symbol left of first digit, right of last digit
// or above/below of each digit in the number
// if there is, save that full number to an array

const digitRegex = /[0-9]+/g;
const symbolRegex = /[^.0-9]+/g;
const symbolRegexString = "^.0-9";

// console.log("test for *", symbolRegex.test("*"));
// symbolRegex.lastIndex = 0;
// console.log("test for @", symbolRegex.test("@"));
// symbolRegex.lastIndex = 0;
// console.log("test for #", symbolRegex.test("#"));
// symbolRegex.lastIndex = 0;
// console.log("test for /", symbolRegex.test("/"));
// symbolRegex.lastIndex = 0;
// console.log("test for =", symbolRegex.test("="));
// symbolRegex.lastIndex = 0;
// console.log("test for $", symbolRegex.test("$"));
// symbolRegex.lastIndex = 0;
// console.log("test for .", symbolRegex.test("."));
// symbolRegex.lastIndex = 0;
// console.log("test for %", symbolRegex.test("%"));
// symbolRegex.lastIndex = 0;

// console.log("test * no g", new RegExp(symbolRegexString).test("*"));
// console.log("test * w g", new RegExp(symbolRegexString, "g").test("*"));
// console.log("test symbolRegex w g", symbolRegex.test("*"));

const partsArray: number[] = [];
const nonMatchedPartsArray: number[] = [];

inputArray.forEach((line, index) => {
  // console.log(`\n ***NEW LINE***: ${line}`);
  // console.log(index);
  const line1 = inputArray[index];

  const matches = line1.matchAll(digitRegex);
  //   console.log(matches);

  for (const match of matches) {
    const matchNumber = match[0];
    const matchStart = match.index as number;
    const matchEnd = ((match.index ? match?.index : 0) +
      match[0].length -
      1) as number;

    // console.log(`\nFound ${matchNumber} start=${matchStart} end=${matchEnd}`);

    //check if symbol to the left
    //   const matchLeft = line1[match.index -1].match(symbolRegex)
    //   console.log("matchStart", line1[matchStart - 1]);
    const leftSymbolReg = new RegExp(symbolRegexString);
    const matchLeft =
      match.index === 0 ? false : leftSymbolReg.test(line1[matchStart - 1]);
    leftSymbolReg.lastIndex = 0;
    // console.log("matchLeft", matchLeft);
    // console.log(
    //   "symbolRegex matchLeft",
    //   symbolRegex.test(line1[matchStart - 1])
    // );

    //   console.log("matchEnd", line1[matchEnd] + 1);
    // console.log(match.input ? match?.input.length - 1 : "error");
    // console.log("totheRight:", line1[matchEnd + 1]);

    // const rightSymbolRegex = new RegExp(symbolRegexString);
    // const matchRight =
    //   match.index && match.input
    //     ? match.index === match.input.length - 1
    //       ? false
    //       : symbolRegex.test(line1[matchEnd + 1])
    //     : false;
    // const matchRight = symbolRegex.test(line1[matchEnd + 1]);
    // console.log("match.length", line.length);
    // console.log("matchEnd +1", matchEnd + 1);
    // console.log("matchEnd + 1 <= line.length", matchEnd + 1 <= line.length);
    // const matchRight =
    //   matchEnd + 1 <= line.length
    //     ? rightSymbolRegex.test(line1[matchEnd + 1])
    //     : false;
    // const matchRightTest = symbolRegex.test(line1[matchEnd + 1]);
    // console.log("matchRightTest", matchRightTest);
    // console.log("just the test", symbolRegex.test(line1[matchEnd + 1]));
    const matchRight =
      matchEnd + 1 <= line.length
        ? symbolRegex.test(line1[matchEnd + 1] || "")
        : false;
    symbolRegex.lastIndex = 0;
    // const matchRight = rightSymbolRegex.test(line1[matchEnd + 1] || "");
    // const matchRight = symbolRegex.test(line1[matchEnd + 1] || "");
    // console.log("line1 ONE", line1);
    // console.log("matchEnd ONE", matchEnd);
    // const matchRight = symbolRegex.test(line1[matchEnd + 1] || "");
    // console.log("matchRight", matchRight);
    // console.log("rightSymREgex", rightSymbolRegex);
    // console.log("by itself", rightSymbolRegex.test(line1[matchEnd + 1] || ""));
    // console.log("match a *", rightSymbolRegex.test("*"));
    // console.log("match a *", leftSymbolReg.test("*"));
    // console.log(
    //   "symbolREg typeof::",
    //   typeof symbolRegex.test(line1[matchEnd + 1] || "")
    // );
    // const newSymbolRegex = new RegExp(symbolRegexString, "g");
    // console.log(
    //   "??symbolRegex",
    //   newSymbolRegex.test(line1[matchEnd + 1]) || ""
    // );
    // const matchRightBLAHHH = symbolRegex.test(line1[matchEnd + 1] || "");
    // console.log("matchRightBLAHHH", matchRightBLAHHH);
    // console.log("line1[matchEnd +1] Boolean", Boolean(line1[matchEnd + 1]));
    // console.log("line1[matchEnd +1] ONE", line1[matchEnd + 1]);
    // console.log("matchEnd + 1", matchEnd + 1);
    // console.log("line.length", line.length);
    // console.log("matchEnd + 1 <= line.length", matchEnd + 1 <= line.length);
    // console.log("matchEnd TWO", matchEnd);
    // console.log("typeof matchEnd +1", typeof matchEnd);
    // console.log("typeof line.length", typeof line.length);
    // console.log("typeof matchEnd", typeof matchRight);
    // console.log(
    //   "typeof symbolRegex",
    //   typeof symbolRegex.test(line1[matchEnd + 1] || "")
    // );
    // console.log("line1[matchEnd +1] TWO", line1[matchEnd + 1]);
    // console.log("match *", symbolRegex.test("*"));
    // console.log("line1 TWO", line1);

    const line0 = inputArray[index - 1] || undefined;
    let matchUp = false;
    for (let i = matchStart - 1; i <= matchEnd + 1; i++) {
      // console.log("line0?.[i]", line0?.[i]);
      if (symbolRegex.test(line0?.[i] || ".")) {
        matchUp = true;
        symbolRegex.lastIndex = 0;
        break;
      }
    }
    // console.log("matchUp", matchUp);

    const line2 = inputArray[index + 1] || undefined;
    let matchDown = false;
    for (let i = matchStart - 1; i <= matchEnd + 1; i++) {
      if (symbolRegex.test(line2?.[i] || ".")) {
        matchDown = true;
        symbolRegex.lastIndex = 0;
        break;
      }
    }
    // console.log("matchDown", matchDown);

    if (matchLeft || matchRight || matchUp || matchDown) {
      // if (matchLeft || matchUp || matchDown) {
      partsArray.push(Number(matchNumber));
    } else {
      nonMatchedPartsArray.push(Number(matchNumber));
    }

    // console.log("partsArray", partsArray);
    // console.log("nonMatchedPartsArray", nonMatchedPartsArray);
  }
});

const answer = addArray(partsArray);
console.log("answer::", answer);
