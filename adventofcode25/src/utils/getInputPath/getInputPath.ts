export type SolveMode = "real" | "test1" | "test2";

export const getInputPath = (solveMode: SolveMode) => {
  switch (solveMode) {
    case "real":
      return "./input.txt";
    case "test1":
      return "./input-test-1.txt";
    case "test2":
      return "./input-test-2.txt";
    default:
      return "./input.txt";
  }
};
