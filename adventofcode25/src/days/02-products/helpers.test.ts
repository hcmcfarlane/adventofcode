import { TNumberRange } from "@utils/index";
import { isTwoEqualHalves, expandRange, isRepeatedSubstring } from "./helpers";

describe("finds if is two equal halves", () => {
  const expectedResults: [string, boolean][] = [
    ["44", true],
    ["12451245", true],
    ["444", false],
    ["124512451245", false],
    ["2222", true],
  ];

  expectedResults.forEach((expectedResult) => {
    const [inputValue, expected] = expectedResult;
    it(`${inputValue} should return ${expected}`, () => {
      expect(isTwoEqualHalves(inputValue)).toBe(expected);
    });
  });
});

describe("expands ranges", () => {
  
  const expectedResults: [TNumberRange, number[]][] = [
    [[1, 5], [1, 2, 3, 4, 5]],
    [[10, 12], [10, 11, 12]],
    [[3, 3], [3]],
  ];

  expectedResults.forEach((expectedResult) => {
    const [inputValue, expected] = expectedResult;
    it(`${inputValue} should return ${expected}`, () => {
      expect(expandRange(inputValue)).toEqual(expected);
    });
  });
});

// Now, an ID is invalid if it is made only of some sequence of digits repeated at least twice. So, 12341234 (1234 two times), 123123123 (123 three times), 1212121212 (12 five times), and 1111111 (1 seven times) are all invalid IDs.
describe("finds if is repeated substring", () => {
  const expectedResults: [string, boolean][] = [
    ["4242", true],
    ["1111", true],
    ["123123123", true],
    ["123", false],
    ["1", false],
    ["", false],
    ["121212", true],
    ["12341234", true],
    ["1212121212", true],
    ["1111111", true],
    ["123456", false]
  ];
  expectedResults.forEach((expectedResult) => {
    const [inputValue, expected] = expectedResult;
    it(`${inputValue} should return ${expected}`, () => {
      expect(isRepeatedSubstring(inputValue)).toBe(expected);
    });
  });
});