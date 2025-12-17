import { addArray } from "./addArray";

describe("addArray", () => {
  it("should add an array of numbers", () => {
    const result = addArray([1, 2, 3, 0]);
    expect(result).toBe(6);
  });
});
