import fs from "node:fs";

const input = fs.readFileSync("inputtest2.txt", "utf-8", (err, data) => {
	if (err) throw err;
});

function formatTestInput(input) {
	let arr = input.split("\r\n");
	return arr;
}

let noopList = formatTestInput(input);
console.log("noopList", noopList);

const numCycleNoop = 1;
const numCycleAddX = 2;
const checkCycle = [20, 60, 100, 140, 180, 220];

function doTheNoop(noops) {
	let X = 1;
	let V = 0;
	let action = "";
	let cyc = 0;
	let signalList = [];
	// let spritePosition = 1; //sprite position, takes up [sp-1, sp, sp+1]
	// let spriteArray = [sp - 1, sp, sp + 1]; //sprite array
	// let px = []; //pixel drawing
	// let pl = 0; //current pixel-drawing line
	// let CRTposition = 0;

	// function drawAPixel(sa, cp, line) {
	// 	if (sa.includes(cp)) {
	// 		px[line].push("#");
	// 	}
	// }

	for (let i = 0; i < noops.length; i++) {
		let currNoop = noops[i];
		console.log(`\ni = ${i}, noop: ${currNoop}`);
		if (currNoop[0] === "n") {
			cyc++;
			// drawAPixel(spriteArray, i);
		} else {
			[action, V] = currNoop.split(" ");
			V = Number(V);
			X = X + V;
			cyc += 2;
			// console.log("V1", V);
		}

		console.log("X", X, "cyc", cyc);
		if (checkCycle.includes(cyc) || checkCycle.includes(cyc - 1)) {
			let x = X - V;
			if (checkCycle.includes(cyc - 1)) {
				if (noops[i][0] === "n") {
					console.log(
						`CYCLE ${cyc}: already checked for cycle ${cyc - 1}`
					);
				} else {
					console.log(
						`***CYCLE ${cyc - 1}; x = ${x}; signal strength ${
							x * (cyc - 1)
						}***`
					);
					signalList.push(x * (cyc - 1));
				}
			} else {
				if (noops[i][0] === "n") {
					console.log(
						`***CYCLE ${cyc}; X = ${X}; signal strength ${
							X * cyc
						}***`
					);
					signalList.push(X * cyc);
				} else {
					console.log(
						`***CYCLE ${cyc}; X = ${x}; signal strength ${
							x * cyc
						}***`
					);
					signalList.push(x * cyc);
				}
			}
		}
		// CRTposition++;
	}
	console.log("\nsignalList", signalList);
	let totalSignalStrength = signalList.reduce((a, b) => a + b);
	// const signalStrength = X * cyc;
	return totalSignalStrength;
}

console.log("Sum of signal strengths:", doTheNoop(noopList));

// let list = [1, 22, 3, 4];

// console.log(list.includes(1));
// console.log(list.includes(5));
// console.log(list.includes(2));
