import fs from "node:fs";
import callsites from "callsites";

const getFromFile = (filename: string) => {
  const callerFullFilepath = callsites()[0].getFileName();
  const filepath = callerFullFilepath?.match(/(.*)[\/\\]/)?.[0] || "";

  const data = fs.readFileSync(`${filepath}${filename}`, { encoding: "utf-8" });
  if (!data) throw Error("No data found; check the filepath");
  return data;
};

export default getFromFile;
