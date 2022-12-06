import fs from "node:fs";

const input = fs.readFileSync("inputtest.txt", "utf8", (err, data) => {
  if (err) throw err;
});

function formatInput(string) {
  let bits = string.split("\r\n");
  return bits;
}

let bits = formatInput(input);
console.log("bits", bits);
