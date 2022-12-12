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
	let prevLocations = [];
	let currPath = 0;
	// let firstSteps = findNextSteps(S);
	// log("first validSteps `x`:", firstSteps);

	[S].forEach((s) => {
		log("start new path");
		findPath(s);
		currPath = 0;
		prevLocations = [];
	});

	function findPath(location) {
		log("\nprev location", prevLocations);
		log("location", location);
		if (JSON.stringify(location) === JSON.stringify(end)) {
			log("reached the end");
			currPath <= minPath ? (minPath = currPath) : "";
			log("final currPath", currPath);
			return;
		}
		// let allNextSteps = findNextSteps(location);
		let nextSteps = findNextSteps(location, prevLocations);
		// log("allNextSteps", allNextSteps);
		// let nextSteps = prevLocation.forEach((l) =>
		// 	allNextSteps.filter((z) => JSON.stringify(z) !== JSON.stringify(l))
		// );
		// let nextSteps = avoidGoingToPreviousLocations(allNextSteps);
		log("nextSteps", nextSteps);
		if (nextSteps.length > 0) {
			currPath++;
			if (currPath > minPath) {
				return;
			}
			prevLocations.push(location);
			nextSteps.forEach((n) => findPath(n));
		} else {
			return;
		}
	}
	console.log("End of all paths");
	console.log("currLoc", currLoc);
	console.log("minPath", minPath);
	console.log("currPath", currPath);

	// for (let i = 0; i < firstSteps.length; i++) {
	// 	currLoc = firstSteps[i];

	// 	findPath(currLoc);

	// 	while (currLoc !== end) {
	// 		let nextSteps = findNextSteps(currLoc);
	// 		// 1. check available directions
	// 		// 2. loop over the 0–4 available directions:
	// 		// 2a. move to that direction
	// 		// 2b. increase current pathlength by 1
	// 		// 2c. if pathlength > current shortest pathlength, then abandon pathfinding and go to next available direction
	// 		// 2d. perform step 1
	// 		// 3. once current location reaches the end, save as new shortest pathlength `minPath`
	// 		currLoc = end;
	// 	}
	// }

	return minPath;
}

function findNextSteps(loc, prevLocations) {
	const x = loc[0];
	const y = loc[1];
	// log(x, y);
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

	for (let j = 0; j < prevLocations.length; j++) {
		// log(prevLocations[j]);
		validSteps = validSteps.filter(
			(z) => JSON.stringify(z) !== JSON.stringify(prevLocations[j])
		);
		// log("filtered these steps", theseSteps);
	}

	return validSteps;
}

function isValidStep(x1, y1, x2, y2) {
	// log("is valid step running with:", x1, y1, x2, y2);
	let initA = hills[x1][y1];
	let nextA = hills[x2][y2];
	// log(initA, nextA);
	let isValid = true;
	// nextA >= initA &&
	nextA.charCodeAt(0) - initA.charCodeAt(0) <= 1
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

// function avoidGoingToPreviousLocations(theseSteps) {
// 	// log("these steps", theseSteps);
// 	// let newSteps = theseSteps;
// 	for (let j = 0; j < prevLocations.length; j++) {
// 		// log(prevLocations[j]);
// 		theseSteps = theseSteps.filter(
// 			(z) =>
// 				JSON.stringify(z) !== JSON.stringify(prevLocations[j])
// 		);
// 		// log("filtered these steps", theseSteps);
// 	}
// 	return theseSteps;
// }
