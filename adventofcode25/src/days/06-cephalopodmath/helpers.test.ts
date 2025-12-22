import { doArithmetic } from "./helpers";

describe("doArithmetic", () => {
  it("operates using '*'", () => {
    const testOperator = "*";
    const testDigits = [1, 2, 3, 4, 5];

    expect(doArithmetic(testOperator, testDigits)).toBe(120);
  });

  it("operates using '+'", () => {
    const testOperator = "+";
    const testDigits = [1, 2, 3, 4, 5];

    expect(doArithmetic(testOperator, testDigits)).toBe(15);
  });
});
