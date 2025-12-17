import { isTwoEqualHalves, expandRange } from "./helpers";

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
  //
  // const expectedResults: []
});
