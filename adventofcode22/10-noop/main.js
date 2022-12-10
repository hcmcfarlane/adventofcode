import fs from "node:fs";
let startTime = performance.now();

const input = fs.readFileSync("input.txt", "utf-8", (err, data) => {
	if (err) throw err;
});

function formatTestInput(input) {
	let arr = input.split("\r\n");
	return arr;
}

let noopList = formatTestInput(input);
// console.log("noopList", noopList);

const numCycleNoop = 1;
const numCycleAddX = 2;
const checkCycle = [20, 60, 100, 140, 180, 220];
const widthOfScreen = 40;

let [sum, pixels] = doTheNoop(noopList);
console.log("Sum of signal strengths:", sum);
// pixels.forEach((p) => console.log(p.length));

let pixelDrawing = pixels.map((p) => p.join("")).join("\n");

console.log("\nPixel drawing:\n");
console.log(pixelDrawing);

let endTime = performance.now();
console.log(`\ncode took ${(endTime - startTime).toPrecision(5)} milliseconds`);

function doTheNoop(noops) {
	let X = 1;
	let V = 0;
	let action = "";
	let cyc = 0;
	let signalList = [];
	let spritePosition = 1; //sprite position, takes up [sp-1, sp, sp+1]
	let spriteArray = [spritePosition - 1, spritePosition, spritePosition + 1]; //sprite array
	let px = []; //pixel drawing
	let pl = 0; //current pixel-drawing line
	let CRTposition = 0;

	function drawAPixel(sa, cp, line) {
		!px[line] ? (px[line] = []) : "";
		if (sa.includes(cp)) {
			px[line].push("#");
		} else {
			px[line].push(".");
		}
		// console.log(cp, px[line]);
		return;
	}

	function updateCRTPosition() {
		CRTposition++;
		if (CRTposition === widthOfScreen) {
			CRTposition = 0;
			pl++;
		}
	}

	for (let i = 0; i < noops.length; i++) {
		let currNoop = noops[i];
		// console.log(`\ni = ${i}, noop: ${currNoop}`);
		if (currNoop[0] === "n") {
			cyc++;
			spritePosition = X;
			spriteArray = [
				spritePosition - 1,
				spritePosition,
				spritePosition + 1,
			];
			// console.log(spritePosition, spriteArray);
			// console.log("currnt line", pl);
			// console.log("CRT position", CRTposition);
		} else {
			[action, V] = currNoop.split(" ");
			V = Number(V);
			X = X + V;
			spritePosition = X - V;
			spriteArray = [
				spritePosition - 1,
				spritePosition,
				spritePosition + 1,
			];
			// console.log(spritePosition, spriteArray);
			// console.log("currnt line", pl);
			// console.log("CRT position", CRTposition);
			cyc++;
			drawAPixel(spriteArray, CRTposition, pl);
			updateCRTPosition();
			cyc++;
			// console.log("V1", V);
		}

		drawAPixel(spriteArray, CRTposition, pl);

		// console.log("X", X, "cyc", cyc);
		//check three diff cases for where the cycle counts
		if (checkCycle.includes(cyc) || checkCycle.includes(cyc - 1)) {
			let x = X - V;
			if (checkCycle.includes(cyc - 1)) {
				if (noops[i][0] === "n") {
					// console.log(
					// `CYCLE ${cyc}: already checked for cycle ${cyc - 1}`
					// );
				} else {
					// console.log(
					// `***CYCLE ${cyc - 1}; x = ${x}; signal strength ${
					// x * (cyc - 1)
					// }***`
					// );
					signalList.push(x * (cyc - 1));
				}
			} else {
				if (noops[i][0] === "n") {
					// console.log(
					// 	`***CYCLE ${cyc}; X = ${X}; signal strength ${
					// 		X * cyc
					// 	}***`
					// );
					signalList.push(X * cyc);
				} else {
					// console.log(
					// 	`***CYCLE ${cyc}; X = ${x}; signal strength ${
					// 		x * cyc
					// 	}***`
					// );
					signalList.push(x * cyc);
				}
			}
		}

		updateCRTPosition();
	}
	console.log("\nsignalList", signalList);
	let totalSignalStrength = signalList.reduce((a, b) => a + b);
	// const signalStrength = X * cyc;
	return [totalSignalStrength, px];
}
