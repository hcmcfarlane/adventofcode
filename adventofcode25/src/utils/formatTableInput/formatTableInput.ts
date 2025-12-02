export const formatTableInput = (input: string, isRN: boolean) => {
  let delimiter = isRN ? "\r\n" : "\n";

  return input
    .trim()
    .split(delimiter)
    .map((elem) => elem.split(" "));
};
