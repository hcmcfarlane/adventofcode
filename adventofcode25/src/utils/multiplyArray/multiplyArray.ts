export const multiplyArray = (array: number[]) => {
  if (array.includes(0)) return 0;
  return array.reduce((a, b) => a * b, 1);
};
