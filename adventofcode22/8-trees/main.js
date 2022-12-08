import fs from "node:fs";

const input = fs.readFileSync("input.txt", "utf-8", (err, data) => {
	if (err) throw err;
});

function formatInput(input) {
	let arr = input.split("\r\n");
	arr = arr.map((a) => a.split("").map((b) => Number(b)));
	let arrT = arr[0].map((_, colIndex) => arr.map((row) => row[colIndex]));

	return [arr, arrT];
}
const [trees, treesT] = formatInput(input);
console.log(trees, "\n", treesT);

function countVisibleTrees(trees) {
	let count = 0;
	let scenicScores = [];

	for (let i = 1; i < trees[0].length - 1; i++) {
		for (let j = 1; j < trees[0].length - 1; j++) {
			//find max of left, check if < [ij] => true
			//find max of right, check if < [ij] => true
			//find max of top:
			// find max of left in treesT
			// check if < treesT[i][j] => true
			//find max of bottom:
			// check of right in treesT[i][j]
			// console.log(i, j, trees[i].slice(0, j));

			const leftTrees = trees[i].slice(0, j);
			const rightTrees = trees[i].slice(j + 1);
			const topTrees = treesT[j].slice(0, i);
			const bottomTrees = treesT[j].slice(i + 1);
			const rowTree = trees[i][j];
			const colTree = treesT[j][i];

			let visLeft = ifVisible(leftTrees, rowTree);
			let visRight = ifVisible(rightTrees, rowTree);
			let visTop = ifVisible(topTrees, colTree);
			let visBottom = ifVisible(bottomTrees, colTree);
			// console.log(trees[i].slice(j + 1));
			// console.log(visLeft, visRight, visTop, visBottom);

			let scenicLeft = calcScenic(leftTrees, rowTree, "left");
			// console.log("scenicLeft", scenicLeft);
			let scenicRight = calcScenic(rightTrees, rowTree, "right");
			// console.log("scenicRight", scenicRight);
			let scenicTop = calcScenic(topTrees, colTree, "left");
			let scenicBottom = calcScenic(bottomTrees, colTree, "right");

			const treeScenicScore =
				scenicLeft * scenicRight * scenicTop * scenicBottom;
			scenicScores.push(treeScenicScore);

			if ([visLeft, visRight, visTop, visBottom].includes(true)) {
				count++;
			}
		}
	}
	// console.log(trees[0].length, trees.length);
	// Add the edge trees, which are all visible:
	count = count + numberOfEdgeTrees(trees[0].length, trees.length);

	//find largest scenic score
	console.log(scenicScores);
	const maxScenicScore = Math.max(...scenicScores);

	return [count, maxScenicScore];
}

function ifVisible(theseTrees, currTree) {
	// console.log(theseTrees, currTree);
	let highestTree = Math.max(...theseTrees);
	let isVisible;
	highestTree < currTree ? (isVisible = true) : (isVisible = false);
	return isVisible;
}

function numberOfEdgeTrees(width, height) {
	//top and bottom rows = width + width
	//one each per middle rows
	const num = width * 2 + 2 * (height - 2);
	return num;
}

function calcScenic(theseTrees, thisTree, direction) {
	let scenicScore = 0;
	// console.log(thisTree, theseTrees);

	const closestBlockingTree = (t) => t >= thisTree;
	let blockingTree;
	switch (direction) {
		case "left":
			blockingTree = theseTrees.findLastIndex(closestBlockingTree);
			// console.log(blockingTree);
			if (blockingTree < 0) {
				scenicScore = theseTrees.length;
			} else if (blockingTree === theseTrees.length - 1) {
				scenicScore = 1;
			} else {
				scenicScore = theseTrees.length - blockingTree;
			}
			break;
		case "right":
			// const closestBlockingTree = (t) => t >= thisTree
			blockingTree = theseTrees.findIndex(closestBlockingTree);
			if (blockingTree < 0) {
				scenicScore = theseTrees.length;
			} else if (blockingTree === 0) {
				scenicScore = 1;
			} else {
				scenicScore = blockingTree + 1;
			}
			break;
		default:
			throw Error("invalid input to calcScenic function");
			break;
	}

	return scenicScore;
}

let totalVisibleTrees = countVisibleTrees(trees);
console.log("[totalVisibleTrees, maxScenicScore] =>", totalVisibleTrees);
