export const formatSingleLineInput = (
  input: string,
  isRN?: boolean | undefined
) => {
  if (isRN) {
    return input.trim().split("\r\n");
  } else {
    return input.trim().split("\n");
  }
};
