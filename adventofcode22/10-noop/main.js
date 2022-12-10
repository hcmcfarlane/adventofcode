import fs from "node:fs";

const input = fs.readFileSync("inputtest1.txt", "utf-8", (err, data) => {
	if (err) throw err;
});

function formatTestInput(input) {
	let arr = input.split("\r\n");
	return arr;
}

let noops = formatTestInput(input);
console.log("noops", noops);
