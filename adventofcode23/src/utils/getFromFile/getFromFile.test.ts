import getFromFile from "./getFromFile";

describe.skip("getFromFile", () => {
  it("should correctly return data", () => {
    const expected = "abc123\ndef456\nghi789";
    const result = getFromFile("test.txt");
    expect(result).toEqual(expected);
  });

  it("should throw error if something goes wrong", () => {
    const result = () => getFromFile("unknown-file.txt");
    expect(result).toThrow();
  });
});
