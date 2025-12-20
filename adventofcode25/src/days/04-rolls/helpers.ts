// For an item in the array, find whether the character "@" is present to the left, right, top left, top right, bottom left, bottom right, and above and below, i.e. in all 8 directions.
// Return a number value of how many "@" are found surrounding the item.

import { rollChar } from "./main";

export function countSurroundingAts(
  x: number,
  y: number,
  array: string[][]
): number {
  let count = 0;
  // The directions we will search are relative to the x,y position in the array
  // If the direction goes out of bounds of the array, we skip it
  // Directions: N, NE, E, SE, S, SW, W, NW
  // N is y-1, E is x +1, S is y+1, W is x-1
  // NE is y-1, x+1; SE is y+1, x+1; SW is y+1, x-1; NW is y-1, x-1
  const directions = [
    [0, -1],
    [1, -1],
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
    [-1, 0],
    [-1, -1],
  ];

  directions.forEach(([dx, dy]) => {
    const newX = x + dx;
    const newY = y + dy;
    if (
      newX >= 0 &&
      newX < array[0].length &&
      newY >= 0 &&
      newY < array.length
    ) {
      if (array[newY][newX] === rollChar) {
        count++;
      }
    }
  });
  return count;
}
