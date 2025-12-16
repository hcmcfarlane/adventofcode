import { normaliseVal } from "./helpers";

describe("normalise val", () => {
  const expectedResults = [
    [1, 1],
    [-1, 99],
    [-5, 95],
    [106, 6],
    [-269, 31],
    [235, 35],
    [0, 0],
    [1000, 0],
  ];

  expectedResults.forEach((expectedResult) => {
    it(`${expectedResult[0]} should be ${expectedResult[1]}`, () => {
      const val = expectedResult[0];
      const expected = expectedResult[1];
      expect(normaliseVal(val)).toBe(expected);
    });
  });
});
