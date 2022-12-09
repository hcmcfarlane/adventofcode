import fs from "node:fs";

const input = fs.readFileSync("inputtest.txt", "utf-8", (err, data) => {
	if (err) throw err;
});

function formatTestInput(input) {
	let arr = input.split("\r\n").map((elem) => elem.split(" "));
	return arr;
}

let moves = formatTestInput(input);
console.log("moves", moves);

function trackPosition(movements) {
	let [x, y] = [0, 0];
	let [maxL, maxR, maxU, maxD] = [0, 0, 0, 0];
	let max;

	for (let i = 0; i < movements.length; i++) {
		let direction = movements[i][0];
		let steps = Number(movements[i][1]);

		switch (direction) {
			case "L":
				x -= steps;
				x < maxL ? (maxL = x) : "";
				break;
			case "R":
				x += steps;
				x > maxR ? (maxR = x) : "";
				break;
			case "U":
				y += steps;
				y > maxU ? (maxU = y) : "";
				break;
			case "D":
				y -= steps;
				y < maxD ? (maxD = y) : "";
				break;
			default:
				throw Error("Unexpected directional input");
				break;
		}
		// Math.abs(y) > max ? (max = y) : "";
		max = Math.max(maxR - maxL, maxU - maxD);
		console.log([x, y], max);
	}

	createBlankArray(max);
	return [x, y];
}

function createBlankArray(size) {}

trackPosition(moves);
