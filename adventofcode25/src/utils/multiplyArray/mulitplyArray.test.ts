import { multiplyArray } from "./multiplyArray";

describe("addArray", () => {
  it("should multiply an array of numbers", () => {
    const result = multiplyArray([1, 2, 3]);
    expect(result).toBe(6);
  });
  it("should multiply another array of numbers", () => {
    const result = multiplyArray([10, 2, 45, 3]);
    expect(result).toBe(2700);
  });
  it("should multiply an array of numbers containing a zero", () => {
    const result = multiplyArray([1, 2, 3, 0]);
    expect(result).toBe(0);
  });
});
