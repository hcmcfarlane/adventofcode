import { dir, log } from "node:console";
import fs from "node:fs";
let startTime = performance.now();

function formatInput(inputFile) {
    const signalsText = fs.readFileSync(inputFile, "utf-8", (err, data) => {
		if (err) throw err;
	});
    // log("signalsText", signalsText)
    const initArr = signalsText.split("\r\n\r\n").map(s => s.replace("\r\n", ", "));
    // log("initArr", initArr)
    const finalArr = initArr.map(j => JSON.parse("["+j+"]"));
    return finalArr
}

function elvesInDistress(input) {
    //for each i in input
        // find if packets are in correct order
        // if yes, add the current index i to an array and to `sum`

    let sum = 0;
    let indices = [];

    for (let i = 0; i < input.length; i++) {
        let correctOrder = true;
        correctOrder = isCorrectOrder(input[i]);
        if (correctOrder) { sum += i; indices.push(i)}
    };

    return {indices, sum}
}

function isCorrectOrder(signals) {
    const s1 = signals[0];
    const s2 = signals[1]; 
    return true
}


const distressSignals = formatInput("inputtest.txt");
// dir(signals, {depth: null})

const result = elvesInDistress(distressSignals);
log("All indices:", result.indices)
log("Sum of indices:", result.sum)

let endTime = performance.now();
console.log(
	`\nRunning time: ${(endTime - startTime).toPrecision(5)} milliseconds`
);

