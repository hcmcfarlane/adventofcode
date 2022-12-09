import fs from "node:fs";

const input = fs.readFileSync("inputtest.txt", "utf-8", (err, data) => {
	if (err) throw err;
});

function formatTestInput(input) {
	let arr = input.split("\r\n").map((elem) => elem.split(" "));
	return arr;
}

let moves = formatTestInput(input);
// console.log("moves", moves);

function trackPositionOfHead(movements, numOfKnots) {
	let [xH, yH] = [0, 0];

	//set up an arbitrary number of knots with starting coords [0,0]
	let coords = {};
	for (let k = 0; k <= numOfKnots; k++) {
		let nameX = "x" + k;
		let nameY = "y" + k;
		// console.log(nameX, nameY);
		// [eval(nameX), eval(nameY)] = [0, 0];
		coords[nameX] = 0;
		coords[nameY] = 0;
	}
	// console.log([coords.x9, coords.y0]);
	// let [x1, y1] = [0, 0];
	// let [x2, y2] = [0, 0];
	// let [x3, y3] = [0, 0];
	// let [x4, y4] = [0, 0];
	// let [x5, y5] = [0, 0];
	// let [x6, y6] = [0, 0];
	// let [x7, y7] = [0, 0];
	// let [x8, y8] = [0, 0];
	// let [x9, y9] = [0, 0];
	// let [maxL, maxR, maxU, maxD] = [0, 0, 0, 0];
	// let maxDim; // largest size of array

	for (let i = 0; i < movements.length; i++) {
		// console.log(...movements[i]);
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
			//
			[xT, yT] = trackPositionOfKnot(xH, yH, xT, yT, false);
		}

		// Math.abs(y) > max ? (max = y) : "";
		// maxDim = Math.max(maxR - maxL, maxU - maxD);
		// console.log([xH, yH], "\n");
		// console.log("\n");
	}

	// createBlankArray(maxDim);
	return [xH, yH];
}

function trackPositionOfKnot(xh, yh, xt, yt, lastKnot) {
	//check if already adjacent
	if (
		(xh - 1 === xt || xh + 1 === xt || xh === xt) &&
		(yh - 1 === yt || yh + 1 === yt || yh === yt)
	) {
		// console.log([xh, yh], [xt, yt]);
		return [xt, yt];
	}
	//if vertically or horiz aligned
	//follows it left or right, or up/down
	//if not vert or horiz aligned, move diagonally
	if (yh === yt) {
		xh > xt ? (xt += 1) : (xt -= 1);
	} else if (xh === xt) {
		yh > yt ? (yt += 1) : (yt -= 1);
	} else {
		xh > xt ? (xt += 1) : (xt -= 1);
		yh > yt ? (yt += 1) : (yt -= 1);
	}
	if (lastKnot && !allPositionsOfTail.includes([xt, yt])) {
		allPositionsOfTail.push([xt, yt]);
	}
	// console.log([xh, yh], [xt, yt]);
	return [xt, yt];
}

function findUniqueTailPositions(pos) {
	function uniqBy(a, key) {
		var seen = {};
		return a.filter(function (item) {
			var k = key(item);
			return seen.hasOwnProperty(k) ? false : (seen[k] = true);
		});
	}
	let unique = uniqBy(pos, JSON.stringify);
	console.log("count of unique", unique.length);
	// console.log("unique", unique);
	return unique;
}

// function createBlankArray(size) {}
let allPositionsOfTail = [[0, 0]];
const numberOfKnots = 9;
trackPositionOfHead(moves, numberOfKnots);
findUniqueTailPositions(allPositionsOfTail);

// console.log("number of tail positions:", allPositionsOfTail.length);
// console.log(allPositionsOfTail);
