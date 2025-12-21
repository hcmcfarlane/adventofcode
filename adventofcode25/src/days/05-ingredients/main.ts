import fs from "node:fs";
import path from "node:path";
import { Timer } from "timer-node";

import {
  formatSingleLineInput,
  formatRangeInput,
  getInputPath,
  type SolveMode,
} from "../../utils";

import { isIngredientFresh } from "./helpers";

// ***SETUP***

const solveMode = (process.env.INPUT_MODE || "test1") as SolveMode;

const baseDir = process.env.ORIGINAL_CWD || process.cwd();
const inputFile = getInputPath(solveMode);

const inputPath = path.join(baseDir, inputFile);
const input = fs.readFileSync(inputPath, { encoding: "utf-8" });

// Type of line endings in input files
const isRN = true;

// ***SOLVE***

const timer = new Timer({ label: "timer" });
timer.start();

console.log("SOLVE MODE:: ", solveMode);
console.log("INPUT FILE:: ", inputFile);

const blankLine = isRN ? "\r\n\r\n" : "\n\n";

const [freshProductsInput, ingredientsInput] = input.trim().split(blankLine);

const freshRangesArray = formatRangeInput(
  formatSingleLineInput(freshProductsInput, isRN).join(","),
  "number"
);
// console.log("freshRangesArray::", freshRangesArray);

const ingredientsArray = formatSingleLineInput(ingredientsInput, isRN);
// console.log("ingredientsArray::", ingredientsArray);

let countOfFreshIngredients = 0;

for (const ingredientId of ingredientsArray) {
  const ingredientIdNum = parseInt(ingredientId, 10);
  if (isIngredientFresh(ingredientIdNum, freshRangesArray)) {
    countOfFreshIngredients++;
  }
}

// Now, The ingredient IDs that these ranges consider to be fresh are 3, 4, 5, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, and 20. So, in this example, the fresh ingredient ID ranges consider a total of 14 ingredient IDs to be fresh.
// Process the database file again. How many ingredient IDs are considered to be fresh according to the fresh ingredient ID ranges?
// There are too many fresh ingredients from the ranges to list individually, but we also need to remove duplicates from the ranges.
// Then, we need to count how many unique ingredient IDs from the ingredients list are in those ranges.
// For example, in the input we have the ranges 3-5, 10-14, 16-20 and 12-18
// The range 16-20 overlaps with 12-18, so we only need to count those IDs once.
// We only need the total of unique fresh ingredient IDs from the ingredients list, so we don't need to list them all out.
// In the example, 3, 4, 5, 10, 11, 12, 13, 14, 16, 17, 18, 19, 20, 12, 13, 14, 15, 16, 17, 18, 19, 20 are the fresh ingredient IDs from the ingredients list.
// Deduplicating those gives us 3, 4, 5, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20 which is a total of 14 unique fresh ingredient IDs.
// Write a function to find the total number of unique fresh ingredient IDs from the ingredients list, keeping in mind that the ranges may overlap, and the ranges are too large to list individually.

// This can't be done using the existing isIngredientFresh function, as that only tells us if a single ingredient ID is fresh or not.
// Edit the below to count unique fresh ingredient IDs.

let uniqueFreshIngredientIds = 0;

// Do not store ingredient IDs, just count them
// First, count the number of ingredients in the first range, by end - start +1
// Then, check the next range, checking for overlaps with the previous ranges
// If there is an overlap, only count the non-overlapping part, by nonOverlapEnd - nonOverlapsRangeStart + 1
// If there is no overlap, count the whole range
// Continue until all ranges are processed

// For an example, for a freshRangesArray of [[ 1000000000, 2000000000 ], [ 1500000000, 2500000000 ], [ 500000000, 999999999 ], [2400000000,2600000000] [2200000000, 260000000]], the solution would be 2000000001.
// That is, 1,000,000,000 to 2,000,000,000 is 1,000,000,001 IDs.
// Then 1,500,000,000 to 2,500,000,000 partially overlaps with 1,500,000,000 to 2,500,000,000, so only 2,000,000,001 to 2,500,000,000 is counted, which is 500,000,000 IDs.
// Then, 500,000,000 to 999,999,999 does not overlap with a previous range, so we count all IDs in that range, which is 500,000,000 IDs.
// Then, 2,400,000,000 to 2,600,000,000 overlaps partially with 1,500,000,000 to 2,500,000,000, so we only count 2,500,000,001 to 2,600,000,000, which is 100,000,000 IDs.
// Then, 2,200,000,000 to 2,600,000,000 overlaps partially with both 1,500,000,000 to 2,500,000,000 and 2,400,000,000 to 2,600,000,000, so there are no new IDs to count.
// So the total is 1,000,000,001 + 500,000,000 + 500,000,000 + 100,000,000 = 2,100,000,001 unique fresh ingredient IDs.

// We must account for the fact that a given range could overlap partially with multiple previous ranges.

// In the example [[3,5],[10,14],[16,20],[12,18]], the range 12-18 overlaps with both 10-14 and 16-20.
// for 3-5, we count 3 IDs: 3,4,5
// for 10-14, we count 5 IDs: 10,11,12,13,14
// for 16-20, we count 5 IDs: 16,17,18,19,20
// for 12-18, we see that 12-14 overlaps with 10-14, and 16-18 overlaps with 16-20, so we only count 15, which is 1 ID.
// So for each range, we need to check for overlaps with all previous ranges, and adjust the non-overlapping start accordingly.

// ***
// WORKS FOR input-test-1.txt and input-test-2.txt but not for input.txt
// ***
freshRangesArray.forEach((range, index) => {
  //   console.log(`\nProcessing range #${index + 1}: ${range}`);
  const [start, end] = range;
  //   console.log("start:: ", start);
  //   console.log("end:: ", end);
  if (index === 0) {
    uniqueFreshIngredientIds += end - start + 1;
  } else {
    let nonOverlapStart = start;
    let nonOverlapEnd = end;
    for (let i = 0; i < index; i++) {
      const [prevStart, prevEnd] = freshRangesArray[i];
      //   console.log("Comparing with previous range #", i + 1, ": ", [
      //     prevStart,
      //     prevEnd,
      //   ]);
      // Check for overlap
      //   console.log("nonOverlapStart <=prevEnd: ", nonOverlapStart <= prevEnd);
      //   console.log("nonOverlapEnd >=prevStart: ", nonOverlapEnd >= prevStart);
      if (nonOverlapStart <= prevEnd && nonOverlapEnd >= prevStart) {
        // There is an overlap
        if (nonOverlapStart >= prevStart && nonOverlapStart <= prevEnd) {
          // Overlap at the start of the current range
          nonOverlapStart = prevEnd + 1;
        }
        if (nonOverlapEnd >= prevStart && nonOverlapEnd <= prevEnd) {
          // Overlap at the end of the current range
          nonOverlapEnd = prevStart - 1;
        }
      }
    }
    if (nonOverlapStart <= nonOverlapEnd) {
      uniqueFreshIngredientIds += nonOverlapEnd - nonOverlapStart + 1;
    }
  }
  //   console.log("uniqueFreshIngredientIds so far:: ", uniqueFreshIngredientIds);
});

// Format uniqueFreshIngredientIds to e10 format if over 1 million
if (uniqueFreshIngredientIds > 1_000_000) {
  const uniqueFreshIngredientIdsInMillions = parseFloat(
    (uniqueFreshIngredientIds / 1_000_000).toFixed(2)
  );
  console.log(
    "uniqueFreshIngredientIds (millions)::",
    uniqueFreshIngredientIdsInMillions + "e6"
  );
}

console.log("countOfFreshIngredients::", countOfFreshIngredients);

console.log("uniqueFreshIngredientIds::", uniqueFreshIngredientIds);
console.log(
  "uniqueFreshIngredientIds in readable format::",
  uniqueFreshIngredientIds.toLocaleString()
);

timer.stop();
console.log("timer.time()", timer.time());

// Tried answers for input.txt:
// 313977946951081 (too low)
// 355785213952197 (too high)
// 358895407379846 (too high)
