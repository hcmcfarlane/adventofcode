import formatTableInput from "./formatTableInput";

describe("formatInput", () => {
  it("should convert input to an array with returns and line breaks", () => {
    const isRN = true;
    const result = formatTableInput("A 1\r\nB 2\r\nC 3", isRN);
    expect(result).toEqual([
      ["A", "1"],
      ["B", "2"],
      ["C", "3"],
    ]);
  });

  it("should convert input to an array with line breaks only", () => {
    const isRN = false;
    const result = formatTableInput("A 1\nB 2\nC 3", isRN);
    expect(result).toEqual([
      ["A", "1"],
      ["B", "2"],
      ["C", "3"],
    ]);
  });
});
