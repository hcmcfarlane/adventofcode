import {getInputPath} from "./getInputPath";

describe("getInputPath", () => {
  it("should return the correct path for 'real' mode", () => {
    const result = getInputPath("real");
    expect(result).toBe("./input.txt");
  });
  it("should return the correct path for 'test1' mode", () => {
    const result = getInputPath("test1");
    expect(result).toBe("./input-test-1.txt");
  });
  it("should return the correct path for 'test2' mode", () => {
    const result = getInputPath("test2");
    expect(result).toBe("./input-test-2.txt");
  });
});
