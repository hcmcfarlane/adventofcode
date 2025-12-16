// valPart2 isn't always a number between -100 and 100, so adding 100 then doing the modulo 100 doesn't always give us back a number between 0 and 99 (inclusive). The dial turn number, which is arr[1], could be any positive integer. Write a function that normalises the input val back to a number between 0 and 99. For example, -5 -> 95, 106 -> 6, 235 -> 35, -269 -> 31
export const normaliseVal = (val: number) => {
  if (val >= 0) {
    return val % 100;
  } else {
    //  val + 100 % 100 doesn't work as the number may be less than minus 100. If val is < -200 then add 200, < -300 then add 300, but in programmatic way
    const hundredsDigit = Math.floor(Math.abs(val) / 100);
    return (val + (hundredsDigit + 1) * 100 + 100) % 100;
  }
};
