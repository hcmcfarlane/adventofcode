import formatSingleLineInput from "./formatSingleLineInput";

describe("formatInput", () => {
  it("should convert input with line breaks to an array", () => {
    const result = formatSingleLineInput("1\n2\n3");
    expect(result).toEqual(["1", "2", "3"]);
  });

  it("should convert input with returns and line breaks to an array", () => {
    const result = formatSingleLineInput("1\r\n2\r\n3", true);
    expect(result).toEqual(["1", "2", "3"]);
  });
});
