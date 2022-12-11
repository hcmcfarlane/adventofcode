import { log } from "node:console";
import fs from "node:fs";
let startTime = performance.now();

const input = fs.readFileSync("inputtest.txt", "utf-8", (err, data) => {
	if (err) throw err;
});

function formatTestInput(input) {
	let obj = [];
	let arr = input
		.replaceAll("\r\n    ", "\r\n")
		.replaceAll("\r\n  ", "\r\n")
		// .split("\r\n");
		// .split("");
		.split("\r\n\r\n");
	for (let i = 0; i < arr.length; i++) {
		arr[i] = [arr[i]];
		arr[i] = arr[i][0].split("\r\n");
		arr[i].shift();
		obj[i] = {};
		let itemsSplit = arr[i][0].split(": ");
		// let startItems = [...itemsSplit[1].split(", ")].map((i) => parseInt(i));
		let startItems = [...itemsSplit[1].split(", ")].map((i) => BigInt(i));
		let opSplit = arr[i][1].split("Operation: new = old ");
		let [operation, opNum] = opSplit[1].split(" ");
		// parseInt(opNum) ? (opNum = parseInt(opNum)) : "";
		parseInt(opNum) ? (opNum = BigInt(opNum)) : "";
		let testSplit = arr[i][2].split("Test: ");
		let [testOp, testNum] = testSplit[1].split(" by ");
		testNum = parseInt(testNum);
		let trueMonkey = parseInt(
			arr[i][3].split("If true: throw to monkey ")[1]
		);
		let falseMonkey = parseInt(
			arr[i][4].split("If false: throw to monkey ")[1]
		);
		// console.log(opSplit);
		obj[i] = {
			startItems,
			operation,
			opNum,
			testOp,
			testNum,
			trueMonkey,
			falseMonkey,
		};
	}

	return obj;
}

function simianShenanigans(obj, rounds) {
	//for number of rounds (20)
	let inspections = new Array(obj.length).fill(0);
	let worry = 0n;
	log(`Number of rounds: ${rounds}`);

	for (let i = 1; i <= rounds; i++) {
		// for (let i = 1; i < 1; i++) {
		//for each 🐒
		// log(`\n***Round ${i}***`);
		for (let m = 0; m < obj.length; m++) {
			//for each item held by 🐒
			let monkeyWorryOp = obj[m].operation;
			let monkeyWorryOpNum = 0n;
			if (obj[m].opNum === "old") {
				monkeyWorryOpNum = "old";
			} else {
				monkeyWorryOpNum = BigInt(obj[m].opNum);
			}
			// monkeyWorryOpNum = BigInt(obj[m].opNum);
			let monkeyTestOp = obj[m].testOp;
			let monkeyTestOpNum = BigInt(obj[m].testNum);
			// log(`\nmonkey ${m}`);
			for (let k = 0; k < obj[m].startItems.length; k++) {
				//TODO: check that this does not happen if startItems is empty
				//add an inspection for monkey m
				// log(`current item: ${obj[m].startItems[k]}`);
				inspections[m]++;
				//initialise worry level of item
				worry = obj[m].startItems[k];
				// console.log("worry", worry);

				//update worry level
				worry = increaseWorryLevel(
					monkeyWorryOp,
					monkeyWorryOpNum,
					worry
				);
				// log("increase worry", worry);

				//divide worry level by 3
				// worry = Math.floor(worry / 3);
				// log("floor worry", worry);

				//check test against the worry level
				//and fling item (which now has value `worry`) to new monkey
				let flungItem = BigInt(worry);

				// log(
				// 	`Item: ${Number(worry)}; Div By: ${Number(
				// 		monkeyTestOpNum
				// 	)}; Remainder: ${Number(worry) % Number(monkeyTestOpNum)}`
				// );
				if (monkeyTestOp === "divisible") {
					// console.log(
					// 	`monkey (divisible) test op number is ${monkeyTestOpNum}`
					// );
					if (worry % monkeyTestOpNum == 0) {
						// log(
						// 	`send flung item ${flungItem} to true monkey ${obj[m].trueMonkey}`
						// );
						obj[obj[m].trueMonkey].startItems.push(flungItem);
					} else {
						// log(
						// 	`send flung item ${flungItem} to false monkey ${obj[m].falseMonkey}`
						// );
						obj[obj[m].falseMonkey].startItems.push(flungItem);
					}
				}
			}
			//throw away the current 🐒 's items
			obj[m].startItems = [];
		}
		// log(`Round ${i}:`);
		// console.log("inspections", inspections);
		for (let j = 0; j < obj.length; j++) {
			// console.log(`monkey ${j} items: ${obj[j].startItems}`);
		}
	}

	// return {`Stuff-slinging simian shenanigans: ${inspections}`;}

	return { obj, inspections };
}

function increaseWorryLevel(operation, operationNumber, currWorry) {
	operationNumber === "old" ? (operationNumber = currWorry) : "";
	switch (operation) {
		case "+":
			currWorry = currWorry + operationNumber;
			break;
		// case "-":
		// 	currWorry = currWorry - operationNumber;
		// 	break;
		case "*":
			currWorry = currWorry * operationNumber;
			break;
		// case "/":
		// 	currWorry = currWorry / operationNumber;
		// 	break;
		default:
			throw Error("Invalid input in monkey operation");
	}
	return currWorry;
}

function monkeyBusiness(insp) {
	insp.sort((a, b) => b - a);
	return insp[0] * insp[1];
}

const numRounds = 1000;
let monkeyRules = formatTestInput(input);
// console.log(monkeyRules);
const shenanigans = simianShenanigans(monkeyRules, numRounds);
// console.dir(shenanigans, { MaxArrayLength: null, depth: null });
// for (let j = 0; j < shenanigans.obj.length; j++) {
// 	console.log(`final monkey ${j} items: ${shenanigans.obj[j].startItems}`);
// }
console.log("final inspections", shenanigans.inspections);

//calculate monkey business score
let monkeyBusinessScore = monkeyBusiness(shenanigans.inspections);
console.log("\nMONKEY BUSINESS: ", monkeyBusinessScore);

let endTime = performance.now();
console.log(
	`\nRunning time: ${(endTime - startTime).toPrecision(5)} milliseconds`
);
