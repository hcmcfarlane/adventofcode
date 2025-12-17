import { formatRangeInput } from "./formatRangeInput";

const input = "11-22,95-115,998-1012,1188511880-1188511890,222220-222224";

describe("format range input to an array", () => {
  it("should convert to string format", () => {
    const result = formatRangeInput(input);

    console.log("result::", result);

    const expected = [
      ["11", "22"],
      ["95", "115"],
      ["998", "1012"],
      ["1188511880", "1188511890"],
      ["222220", "222224"],
    ];

    expect(result).toStrictEqual(expected);
  });

  it("should convert to number format", () => {
    const result = formatRangeInput(input, "number");

    console.log("result::", result);

    const expected = [
      [11, 22],
      [95, 115],
      [998, 1012],
      [1188511880, 1188511890],
      [222220, 222224],
    ];

    expect(result).toStrictEqual(expected);
  });
});
