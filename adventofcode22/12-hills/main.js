import { log } from "node:console";
import fs from "node:fs";
let startTime = performance.now();

function formatTestInput(inputFile) {
	const hillsText = fs.readFileSync(inputFile, "utf-8", (err, data) => {
		if (err) throw err;
	});
	log(hillsText);
	const arrInit = hillsText.split("\r\n");
	const hills = arrInit.map((m) => m.split(""));

	let width = hills[0].length;
	let startS = findCoords(hillsText.indexOf("S"), width);
	let endE = findCoords(hillsText.indexOf("E"), width);
	hills[startS[0]][startS[1]] = "a";

	return [hills, startS, endE];
}

function findCoords(location, width) {
	//use width+2 to account for line breaks `\r\n`
	let i = Math.floor(location / (width + 2));
	let j = location % (width + 2);
	return [i, j];
}

function runningUpThatHill(hills, S, E) {
	const end = E;
	let currLoc = S;
	let minPath = 1e6;

	let x = findNextSteps(S, hills);
	log("validSteps `x`:", x);

	for (let i = 0; i < x.length; i++) {
		while (currLoc !== end) {
			// 1. check available directions
			// 2. loop over the 4 available directions:
			// 2a. move to that direction
			// 2b. increase current pathlength by 1
			// 2c. if pathlength > current shortest pathlength, then abandon pathfinding and go to next available direction
			// 2d. perform step 1
			// 3. once current location reaches the end, save as new shortest pathlength `minPath`
			currLoc = end;
		}
	}

	return minPath;
}

function findNextSteps(loc, hills) {
	const x = loc[0];
	const y = loc[1];
	log(x, y);
	// if (hills[x][y] === "S") {
	// 	x = "a";
	// 	y = "";
	// }
	let [uX, uY] = [];
	let [dX, dY] = [];
	let [lX, lY] = [];
	let [rX, rY] = [];

	x - 1 >= 0 ? ([uX, uY] = [x - 1, y]) : "";
	x + 1 < hills.length ? ([dX, dY] = [x + 1, y]) : "";
	y - 1 >= 0 ? ([lX, lY] = [x, y - 1]) : "";
	y + 1 < hills[0].length ? ([rX, rY] = [x, y + 1]) : "";

	log("up", [uX, uY], "down", [dX, dY], "left", [lX, lY], "right", [rX, rY]);
	// let [up, down, left, right] = [];
	// x - 1 >= 0 ? (up = hills[x - 1][y]) : (up = ".");
	// x + 1 < hills.length ? (down = hills[x + 1][y]) : (down = ".");
	// y - 1 >= 0 ? (left = hills[x][y - 1]) : (left = ".");
	// y + 1 < hills[0].length ? (right = hills[x][y + 1]) : (right = ".");

	let validSteps = [];
	uX !== undefined && uY !== undefined && isValidStep(x, y, uX, uY)
		? validSteps.push([uX, uY])
		: "";
	dX !== undefined && dY !== undefined && isValidStep(x, y, dX, dY)
		? validSteps.push([dX, dY])
		: "";
	lX !== undefined && lY !== undefined && isValidStep(x, y, lX, lY)
		? validSteps.push([lX, lY])
		: "";
	rX !== undefined && rY !== undefined && isValidStep(x, y, rX, rY)
		? validSteps.push([rX, rY])
		: "";

	return validSteps;
}

function isValidStep(x1, y1, x2, y2) {
	log("is valid step running with:", x1, y1, x2, y2);
	let initA = hills[x1][y1];
	let nextA = hills[x2][y2];
	log(initA, nextA);
	let isValid = true;
	nextA >= initA && nextA.charCodeAt(0) - initA.charCodeAt(0) <= 1
		? (isValid = true)
		: (isValid = false);
	return isValid;
}

let [hills, startS, endE] = formatTestInput("inputtest.txt");
// console.log(hills);
log("S:", startS, "and E:", endE);
runningUpThatHill(hills, startS, endE);

let endTime = performance.now();
console.log(
	`\nRunning time: ${(endTime - startTime).toPrecision(5)} milliseconds`
);

// function findValidStep(x, u, d, l, r) {
// 	console.log("x", x, "u", u, "d", d, "l", l, "r", r);
// 	let validSteps = [];
// 	u === "."
// 		? ""
// 		: u && u >= x && u.charCodeAt(0) - x.charCodeAt(0) <= 1
// 		? validSteps.push(u)
// 		: "";
// 	d === "."
// 		? ""
// 		: d >= x && d.charCodeAt(0) - x.charCodeAt(0) <= 1
// 		? validSteps.push(d)
// 		: "";
// 	l === "."
// 		? ""
// 		: l >= x && l.charCodeAt(0) - x.charCodeAt(0) <= 1
// 		? validSteps.push(l)
// 		: "";
// 	r === "."
// 		? ""
// 		: r >= x && r.charCodeAt(0) - x.charCodeAt(0) <= 1
// 		? validSteps.push(r)
// 		: "";
// 	return validSteps;
// }
