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
	let max = 0;

	for (let i = 0; i < movements.length; i++) {
		let direction = movements[i][0];
		let steps = Number(movements[i][1]);

		switch (direction) {
			case "L":
				x -= steps;

				break;
			case "R":
				x += steps;
				break;
			case "U":
				y += steps;
				break;
			case "D":
				y -= steps;
				break;
			default:
				throw Error("Unexpected directional input");
				break;
		}
		Math.abs(x) > max ? (max = x) : "";
		Math.abs(y) > max ? (max = y) : "";
		console.log([x, y], max);
	}
	return [x, y];
}

trackPosition(moves);
