import fs from "node:fs";

const input = fs.readFileSync("input.txt", "utf-8", (err, data) => {
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
	for (let k = 1; k <= numOfKnots; k++) {
		let nameX = "x" + k;
		let nameY = "y" + k;
		coords[nameX] = 0;
		coords[nameY] = 0;
	}

	for (let i = 0; i < movements.length; i++) {
		// for (let i = 0; i < 2; i++) {
		console.log(...movements[i]);
		let direction = movements[i][0];
		let steps = Number(movements[i][1]);

		for (let j = 0; j < steps; j++) {
			switch (direction) {
				case "L":
					xH -= 1;
					break;
				case "R":
					xH += 1;
					break;
				case "U":
					yH += 1;
					break;
				case "D":
					yH -= 1;
					break;
				default:
					throw Error("Unexpected directional input");
					break;
			}
			// console.log("Head:", [xH, yH]);
			//track knot 1 (follows head)
			[coords.x1, coords.y1] = trackPositionOfKnot(
				xH,
				yH,
				coords.x1,
				coords.y1,
				false
			);
			// console.log([coords.x1, coords.y1]);
			//track each knot 2–8 in turn (follows knot k-1)
			for (let k = 2; k < numOfKnots; k++) {
				let Kx = "x" + k;
				let Ky = "y" + k;
				let K1x = "x" + (k - 1);
				let K1y = "y" + (k - 1);

				[coords[Kx], coords[Ky]] = trackPositionOfKnot(
					coords[K1x],
					coords[K1y],
					coords[Kx],
					coords[Ky],
					false
				);
			}
			//track final knot (follows knot numOfKnots-1)
			[coords["x" + numOfKnots], coords["y" + numOfKnots]] =
				trackPositionOfKnot(
					coords["x" + (numOfKnots - 1)],
					coords["y" + (numOfKnots - 1)],
					coords["x" + numOfKnots],
					coords["y" + numOfKnots],
					true
				);
			// console.log("coords", coords);
			// console.log("\n");
		}
		console.log("Head", [xH, yH]);
		console.log("knot1 position", [coords.x1, coords.y1]);
		// console.log("knot2 position", [coords.x2, coords.y2]);
		// console.log("knot3 position", [coords.x3, coords.y3]);
		console.log("final knot position", [coords.x9, coords.y9], "\n");
		// console.log("\n");
	}

	return [xH, yH];
}

function trackPositionOfKnot(xh, yh, xt, yt, lastKnot) {
	//check if already adjacent

	// console.log(xh, yh, xt, yt);
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
const numberOfKnots = 10;
const numberOfTailKnots = numberOfKnots - 1;
trackPositionOfHead(moves, numberOfTailKnots);
findUniqueTailPositions(allPositionsOfTail);

// console.log("number of tail positions:", allPositionsOfTail.length);
// console.log(allPositionsOfTail);
