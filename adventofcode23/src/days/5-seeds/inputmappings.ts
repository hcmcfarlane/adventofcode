import fs from "node:fs";
import formatSingleLineInput from "../../utils/formatSingleLineInput/formatSingleLineInput";

const useTestInput = false;
const useTestInput2 = false;

const testInput = "./input-test.txt";
const testInput2 = "./input-test-2.txt";
const realInput = "./input.txt";

const isRN = true;
const input = formatSingleLineInput(
  fs.readFileSync(
    useTestInput ? (useTestInput2 ? testInput2 : testInput) : realInput,
    {
      encoding: "utf-8",
    }
  ),
  isRN
);

// console.log(input);

const seed2SoilMap = "seed-to-soil map:";
const soil2FertMap = "soil-to-fertilizer map:";
const fert2WtMap = "fertilizer-to-water map:";
const wt2LtMap = "water-to-light map:";
const lt2TmpMap = "light-to-temperature map:";
const tmp2HumMap = "temperature-to-humidity map:";
const hum2LocMap = "humidity-to-location map:";

export const seeds = input[0].replace("seeds: ", "").split(" ");
// console.log(seeds);

const getLineStart = (lineName: string) => {
  const idx = input.findIndex((l) => l === lineName);
  return idx ? idx + 1 : 0;
};

const getLineEnd = (lineNameOfNext: string) => {
  const next = getLineStart(lineNameOfNext);
  return next ? next - 3 : 0;
};

const seed2SoilLineStart = getLineStart(seed2SoilMap);
const soil2FertLineStart = getLineStart(soil2FertMap);
const fert2WtLineStart = getLineStart(fert2WtMap);
const wt2LtLineStart = getLineStart(wt2LtMap);
const lt2TmpLineStart = getLineStart(lt2TmpMap);
const tmp2HumLineStart = getLineStart(tmp2HumMap);
const hum2LocLineStart = getLineStart(hum2LocMap);

const seed2SoilLineEnd = getLineEnd(soil2FertMap);
const soil2FertLineEnd = getLineEnd(fert2WtMap);
const fert2WtLineEnd = getLineEnd(wt2LtMap);
const wt2LtLineEnd = getLineEnd(lt2TmpMap);
const lt2TmpLineEnd = getLineEnd(tmp2HumMap);
const tmp2HumLineEnd = getLineEnd(hum2LocMap);
const hum2LocLineEnd = input.length - 1;

const formatMap = (lineStart: number, lineEnd: number): string[][] => {
  return input.slice(lineStart, lineEnd + 1).map((k) => k.split(" "));
};

export const seed2soil = formatMap(seed2SoilLineStart, seed2SoilLineEnd);
// console.log(seed2soil);
export const soil2Fert = formatMap(soil2FertLineStart, soil2FertLineEnd);
// console.log(soil2Fert);
export const fert2Wt = formatMap(fert2WtLineStart, fert2WtLineEnd);
// console.log(fert2Wt);
export const wt2Lt = formatMap(wt2LtLineStart, wt2LtLineEnd);
// console.log(wt2Lt);
export const lt2Tmp = formatMap(lt2TmpLineStart, lt2TmpLineEnd);
// console.log(lt2Tmp);
export const tmp2Hum = formatMap(tmp2HumLineStart, tmp2HumLineEnd);
// console.log(tmp2Hum);
export const hum2Loc = formatMap(hum2LocLineStart, hum2LocLineEnd);
