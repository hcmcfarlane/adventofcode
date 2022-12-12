import { log } from "node:console";
import fs from "node:fs";
let startTime = performance.now();

function formatTestInput(inputFile) {
	const hillsText = fs.readFileSync(inputFile, "utf-8", (err, data) => {
		if (err) throw err;
	});
	log(hillsText);
	const maxPath = hillsText.length;
	const arrInit = hillsText.split("\r\n");
	const hills = arrInit.map((m) => m.split(""));

	let width = hills[0].length;
	let startS = findCoords(hillsText.indexOf("S"), width);
	let endE = findCoords(hillsText.indexOf("E"), width);
	hills[startS[0]][startS[1]] = "a";

	return [hills, startS, endE, maxPath];
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
	// log("inital prevL", prevL);
	// let currMinPath = 0;
	let currPath = 0;
	// let firstSteps = findNextSteps(S);
	// log("first validSteps `x`:", firstSteps);
	let resetCurrPath = false;

	[S].forEach((s) => {
		log("start new path");
		currPath = 0;
		prevLocations = new Array(maxPath).fill([]);
		findPath(s, currPath);
	});

	function findPath(location, pathLength) {
		// prevLocations[pathLength] = [];
		// log("\nprev location as argument", prevLocations);
		log("\nlocation", location);
		log("pathLength arg", pathLength);
		// log("prevLocations[0]", prevLocations[0]);
		// log("prevLocations[pathLength]", prevLocations[pathLength]);
		resetCurrPath ? (currPath = pathLength) : "";
		log("length of path at start", currPath);

		if (JSON.stringify(location) === JSON.stringify(end)) {
			log("\n*** Reached the end***");
			currPath <= minPath ? (minPath = currPath) : "";
			currPath = pathLength;
			// prevLocations = [];
			// prevLocations.splice(0, prevLocations.length - pathLength);
			// reset the previous locations array from the current pathLength up to the end of the array
			for (let k = pathLength - 1; k < maxPath; k++) {
				prevLocations[k] = [];
			}
			// log("prevLocations", prevLocations);
			log("final currMinPath", minPath);
			return;
		}

		if (currPath > minPath) {
			log("Path stopped, > minPath");
			currPath = pathLength;
			resetCurrPath = false;
			prevLocations = prevLocations.splice(
				0,
				prevLocations.length - pathLength
			);
			return;
		}
		resetCurrPath = true;
		let nextSteps = findNextSteps(location, prevLocations[pathLength]);

		log("nextSteps", nextSteps);
		currPath++;
		if (nextSteps.length > 0) {
			pathLength = currPath;

			// log("length of path currently", currPath);
			// // pathLength++;
			// // if (!prevLocations[pathLength].includes(location)) {
			// // 	prevLocations[pathLength].push(location);
			// // }
			// log(
			// 	"prevLocations[pathLength]",
			// 	prevLocations[pathLength],
			// 	"location",
			// 	location
			// );
			// log(
			// 	"is in array",
			// 	isArrayInArray(prevLocations[pathLength], location)
			// );
			if (!isArrayInArray(prevLocations[pathLength], location)) {
				prevLocations[pathLength] = prevLocations[pathLength].concat([
					location,
				]);
				prevLocations[pathLength] = prevLocations[pathLength].concat(
					prevLocations[pathLength - 1]
				);
			}
			//then add any from previous that aren't in the current
			// TODO: Idk why this isn't working
			// for (let m = 0; m < prevLocations[pathLength - 1]; m++) {
			// 	if (
			// 		!isArrayInArray(
			// 			prevLocations[pathLength],
			// 			prevLocations[pathLength - 1][m]
			// 		)
			// 	) {
			// 		prevLocations[pathLength] = prevLocations[
			// 			pathLength
			// 		].concat([prevLocations[pathLength - 1][m]]);
			// 	}
			// }

			nextSteps.forEach((n) => findPath(n, pathLength));
			// pathLength++;
		} else {
			pathLength = currPath;
			return;
		}
	}
	console.log("\n***End of all paths***");
	console.log("currLoc", currLoc);
	console.log("minPath", minPath);
	console.log("currPath", currPath);

	// 	while (currLoc !== end) {
	// 		let nextSteps = findNextSteps(currLoc);
	// 		// 1. check available directions
	// 		// 2. loop over the 0–4 available directions:
	// 		// 2a. move to that direction
	// 		// 2b. increase current pathlength by 1
	// 		// 2c. if pathlength > current shortest pathlength, then abandon pathfinding and go to next available direction
	// 		// 2d. perform step 1
	// 		// 3. once current location reaches the end, save as new shortest pathlength `minPath`
	//}

	return minPath;
}

function findNextSteps(loc, prevArray) {
	const x = loc[0];
	const y = loc[1];

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

	for (let j = 0; j < prevArray.length; j++) {
		// log(prevLocations[j]);
		validSteps = validSteps.filter(
			(z) => JSON.stringify(z) !== JSON.stringify(prevArray[j])
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

function isArrayInArray(arr, item) {
	let itemStr = JSON.stringify(item);

	var contains = arr.some(function (ele) {
		return JSON.stringify(ele) === itemStr;
	});
	return contains;
}

let [hills, startS, endE, maxPath] = formatTestInput("inputtest.txt");
// console.log(hills);
log("S:", startS, "and E:", endE);
let quickestPath = runningUpThatHill(hills, startS, endE);
console.log("\nFASTEST PATH IS: ", quickestPath);

let endTime = performance.now();
console.log(
	`\nRunning time: ${(endTime - startTime).toPrecision(5)} milliseconds`
);
