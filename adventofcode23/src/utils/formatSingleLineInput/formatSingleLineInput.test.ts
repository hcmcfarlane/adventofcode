import formatSingleLineInput from "./formatSingleLineInput";

describe("formatInput", () => {
  it("should convert input to an array", () => {
    const result = formatSingleLineInput("1\n2\n3");
    expect(result).toEqual(["1", "2", "3"]);
  });
});
