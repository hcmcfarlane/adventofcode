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

function trackPositionOfHead(movements) {
	let [xH, yH] = [0, 0];
	let [xT, yT] = [0, 0];
	// let [maxL, maxR, maxU, maxD] = [0, 0, 0, 0];
	// let maxDim; // largest size of array

	for (let i = 0; i < movements.length; i++) {
		console.log(...movements[i]);
		let direction = movements[i][0];
		let steps = Number(movements[i][1]);

		for (let j = 0; j < steps; j++) {
			switch (direction) {
				case "L":
					xH -= 1;
					// xH < maxL ? (maxL = xH) : "";
					break;
				case "R":
					xH += 1;
					// xH > maxR ? (maxR = xH) : "";
					break;
				case "U":
					yH += 1;
					// yH > maxU ? (maxU = yH) : "";
					break;
				case "D":
					yH -= 1;
					// yH < maxD ? (maxD = yH) : "";
					break;
				default:
					throw Error("Unexpected directional input");
					break;
			}
			[xT, yT] = trackPositionOfTail(xH, yH, xT, yT);
		}

		// Math.abs(y) > max ? (max = y) : "";
		// maxDim = Math.max(maxR - maxL, maxU - maxD);
		// console.log([xH, yH], "\n");
		console.log("\n");
	}

	// createBlankArray(maxDim);
	return [xH, yH];
}

function trackPositionOfTail(xh, yh, xt, yt) {
	//check if already adjacent
	if (
		(xh - 1 === xt || xh + 1 === xt || xh === xt) &&
		(yh - 1 === yt || yh + 1 === yt || yh === yt)
	) {
		return [xt, yt];
	}
	//if vertically aligned
	//follows it up or down wards
	if (yh === yt) {
		if (xh > xt) {
			xt -= 1;
		} else {
			xt += 1;
		}
	} else {
		xh > xt ? (xt -= 1) : (xt += 1);
	}

	console.log([xh, yh], [xt, yt]);
	return [xt, yt];
}

// function createBlankArray(size) {}

trackPositionOfHead(moves);
