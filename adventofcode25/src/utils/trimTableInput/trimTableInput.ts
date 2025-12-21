/**
 * For string inputs formatted as a table that contain multiple unwanted whitespaces, or leading/trailing spaces per line
 * Outputs a string with whitespaces removed, that can then be safely processed by, for example, `formatTableInput`
 * The line endings are of the form `\r\n` so set isRN to true as needed for further processing
 * @param input
 */
export const trimTableInput = (input: string): string => {
  return input
    .split(/\r?\n/) // handle \n and \r\n safely
    .map(
      (line) =>
        line
          .trim() // remove leading/trailing spaces
          .replace(/ {2,}/g, " ") // collapse multiple spaces
    )
    .join("\r\n");
};
