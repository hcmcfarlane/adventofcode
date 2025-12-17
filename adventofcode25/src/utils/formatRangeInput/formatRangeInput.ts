const delim1 = ",";
const delim2 = "-";

export const formatRangeInput = (
  input: string,
  outputType?: "number" | "string"
): string[][] | number[][] => {
  const determinedOutputType = !outputType ? "string" : outputType;

  const toNumber = (s: string) => Number(s);

  const formatToString = (input: string) => {
    return input
      .trim()
      .split(delim1)
      .map((elem) => elem.split(delim2));
  };

  const formatToNumber = (input: string) => {
    return input
      .trim()
      .split(delim1)
      .map((elem) => elem.split(delim2))
      .map((row) => row.map(toNumber));
  };

  return determinedOutputType === "string"
    ? formatToString(input)
    : formatToNumber(input);
};
