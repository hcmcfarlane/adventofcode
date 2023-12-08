const formatTableInput = (input: string) => {
  return input
    .trim()
    .split("\r\n")
    .map((elem) => elem.split(" "));
};

export default formatTableInput;
