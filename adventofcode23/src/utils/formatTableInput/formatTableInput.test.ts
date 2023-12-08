import formatTableInput from "./formatTableInput";

describe("formatInput", () => {
  it("should convert input to an array", () => {
    const result = formatTableInput("A 1\r\nB 2\r\nC 3");
    expect(result).toEqual([
      ["A", "1"],
      ["B", "2"],
      ["C", "3"],
    ]);
  });
});
