import { addArray, multiplyArray } from "../../utils";

export const multiplicationOperator = "*" as const;
export const additionOperator = "+" as const;

export const doArithmetic = (operator: string, digits: number[]) => {
  if (operator === multiplicationOperator) {
    return multiplyArray(digits);
  } else if (operator === additionOperator) {
    return addArray(digits);
  } else {
    throw new Error("Unknown operator found");
  }
};
