import {
  seeds,
  seed2soil,
  soil2Fert,
  fert2Wt,
  wt2Lt,
  lt2Tmp,
  tmp2Hum,
  hum2Loc,
} from "./inputmappings";

interface AlmanacMapping {
  [key: string]: string;
}

const seedSoil = {} as AlmanacMapping;
const soilFertilizer = {} as AlmanacMapping;
const fertilizerWater = {} as AlmanacMapping;
const waterLight = {} as AlmanacMapping;
const lightTemperature = {} as AlmanacMapping;
const temperatureHumidity = {} as AlmanacMapping;
const humidityLocation = {} as AlmanacMapping;

const writeList = (input: string[][], listToWrite: AlmanacMapping) => {
  input.forEach((map) => {
    for (let i = 0; i < Number(map[2]); i++) {
      listToWrite[Number(map[1]) + i] = String(Number(map[0]) + i);
    }
  });
};

const allMaps: [string[][], AlmanacMapping][] = [
  [seed2soil, seedSoil],
  [soil2Fert, soilFertilizer],
  [fert2Wt, fertilizerWater],
  [wt2Lt, waterLight],
  [lt2Tmp, lightTemperature],
  [tmp2Hum, temperatureHumidity],
  [hum2Loc, humidityLocation],
];

allMaps.forEach((map) => {
  writeList(map[0], map[1]);
  //   console.log(map[1]);
});

// console.log("seedSoil", seedSoil);
const allLocations: number[] = [];

const seedToLocation = (seed: string): void => {
  const soil = seedSoil[seed] ? seedSoil[seed] : seed;
  //   console.log(soil);
  const fert = soilFertilizer[soil] ? soilFertilizer[soil] : soil;
  //   console.log(fert);
  const water = fertilizerWater[fert] ? fertilizerWater[fert] : fert;
  //   console.log(water);
  const light = waterLight[water] ? waterLight[water] : water;
  //   console.log(light);
  const temp = lightTemperature[light] ? lightTemperature[light] : light;
  //   console.log(temp);
  const humidity = temperatureHumidity[temp] ? temperatureHumidity[temp] : temp;
  //   console.log(humidity);
  const location = humidityLocation[humidity]
    ? humidityLocation[humidity]
    : humidity;
  //   console.log(location);

  allLocations.push(Number(location));
  //   return Number(location);
};

seeds.forEach((seed) => seedToLocation(seed));

// console.log(allLocations);

const lowestLocation = Math.min(...allLocations);
console.log("lowestLocation::", lowestLocation);
