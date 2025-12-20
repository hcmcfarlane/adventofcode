const delim1 = ",";
const delim2 = "-";

export type TOutput = "number" | "string";
export type TNumberRange = [number, number];
export type TStringRange = [string, string];

export function formatRangeInput<TOutputTypes extends TOutput>(
  input: string,
  outputType?: TOutputTypes,
): TOutputTypes extends "number" ? TNumberRange[] : TStringRange[] {
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
    ? (formatToString(input) as any)
    : (formatToNumber(input) as any);
}
