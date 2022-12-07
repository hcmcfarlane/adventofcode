import fs from "node:fs";

const input = fs.readFileSync("inputtest.txt", "utf-8", (err, data) => {
	if (err) throw err;
});

let inputFileStructure = { home: {} };
let inputDir = "inputFileStructure.home";
// let inputDir = "home";

console.log("inputFileStruct", inputFileStructure);

function formatTestInput(input) {
	let arr = input.split("\r\n");
	// console.log(arr[1].slice(0, 4));
	for (let i = 0; i < arr.length; i++) {
		console.log("current command:", arr[i]);
		if (arr[i][0] === "$") {
			if (arr[i] === "$ cd /") {
				inputDir = "inputFileStructure.home";
			} else if (arr[i] === "$ cd ..") {
				let inputDirArr = inputDir.split(".");
				inputDirArr.pop();
				inputDirArr.pop();
				inputDir = inputDirArr.join(".");
			} else if (arr[i].slice(0, 4) === "$ cd") {
				let newDir = arr[i].slice(5);
				inputDir = inputDir + ".dir." + newDir;
			} else if (arr[i].slice(0, 4) === "$ ls") {
				//TODO:
				console.log("Do some stuff with ls here");
			} else {
				console.log("ERROR: Unexpected input beginning with `$`");
			}
		} else if (arr[i].slice(0, 3) === "dir") {
			//TODO:
			// create a directory here
			let newDir = arr[i].slice(4);
			console.log("newDir", newDir);
			console.log("inputDir", inputDir);
			console.log(
				"check whether dir exists",
				Object.hasOwn(eval(inputDir), "dir")
			);
			Object.hasOwn(eval(inputFileStructure), "dir")
				? ""
				: (eval(inputDir).dir = {});
			console.log("object after creating .dir", inputFileStructure);

			// inputFileStructure[inputDir].dir[newDir]
			Object.hasOwn(`${inputFileStructure}.dir`, newDir)
				? ""
				: //
				  (eval(inputDir).dir[newDir] = {});
			console.log(inputFileStructure);
		} else if (typeof parseInt(arr[i][0]) === "number") {
			console.log(
				"Will deal with files in the ls section, so ignore for now"
			);
		} else {
			console.log("ERROR: Unexpected input in file");
		}
		console.log("inputDir", inputDir, "\n------------\n");
	}
	return arr;
}

// const str = "51254";
// console.log(str[0]);
// console.log(str, typeof parseInt(str[0]));

let code = formatTestInput(input);
// let code = formatTestInput("$ cd a\r\n$ cd ..");
// let code = formatTestInput("$ cd a");
console.log("code", code);
console.log(inputFileStructure);

// $ cd X goes to directory X - save currDir
// $ ls prints the list of files in currDir
// $ ls goes up until the next command starting `$`
// for each file in currDir:
// dir a is a directory (can ignore??)
// start with a number then is a filename with a filesize

let fileStructure = {
	home: {
		dir: {
			a: {
				dir: {
					e: {
						// dir: {},
						files: { i: 584 },
					},
				},
				files: { f: 29116, g: 2557, "h.lst": 62596 },
			},
			d: {
				// dir: {},
				files: {
					j: 4060174,
					"d.log": 8033020,
					"d.ext": 5626152,
					k: 7214296,
				},
			},
		},
		files: { "b.txt": 14848514, "c.dat": 8504156 },
	},
};

let currDir = "fileStructure.home";
let fileSizeLimit = 100000;
let sumOfSmallDirs = 0;
let totalFileSize = 0;

function changeDirectory(code) {
	if (code === "cd /") {
		currDir = "fileStructure.home";
	} else if (code === "cd ..") {
		if (currDir === "fileStructure.home") {
			currDir;
		} else {
			let newDirArray = currDir.split(".");
			// console.log("newDirArray", newDirArray);
			newDirArray.pop();
			newDirArray.pop();

			currDir = newDirArray.join(".");
			// console.log("newDirArray", newDirArray);
			// console.log("currDir", currDir);
			// currDir =
		}
	} else {
		let [action, newDir] = code.split(" ");

		currDir = currDir + ".dir." + `${newDir}`;
	}
	console.log("currDir after calling changeDirectory", currDir);
	return;
}

function loopThroughDirectories(directory) {
	// console.log("directory", directory);
	// console.log(Object.hasOwn(eval(directory), "dir"));
	calcFileSize(directory, true);
	if (Object.hasOwn(eval(directory), "dir")) {
		// for (LOOP OVER EACH KEY IN currDir.dir) {
		console.log("inside if");
		// console.log(eval(directory + ".dir"));

		for (const [key, value] of Object.entries(eval(directory + ".dir"))) {
			// calcFileSize(directory, true);
			console.log("value", value, "key", key);
			changeDirectory(`cd ${key}`);
			loopThroughDirectories(currDir);
		}
		changeDirectory(`cd ..`);
	} else {
		console.log("inside else");
		calcFileSize(directory, false);
	}
	changeDirectory(`cd ..`);

	return;
}

function calcFileSize(directory, addToTotal) {
	let currFileSize = 0;
	for (const [key, value] of Object.entries(eval(directory + ".files"))) {
		console.log("value", value, "key", key);
		addToTotal ? (totalFileSize += value) : totalFileSize;
		currFileSize += value;
	}
	currFileSize <= fileSizeLimit
		? (sumOfSmallDirs += currFileSize)
		: sumOfSmallDirs;
	console.log("currFileSize", currFileSize);
	console.log("totalFileSize", totalFileSize);
	console.log("sumOfSmallDirs", sumOfSmallDirs);

	return [currFileSize, totalFileSize, sumOfSmallDirs];
}

// changeDirectory("cd /");
// loopThroughDirectories(currDir);
// changeDirectory("cd e");

// console.log(`${currDir}`); //fileStructure.home.dir.a
// console.log(`${currDir}[files]`); //fileStructure.home.dir.a[files]
/////////////////////////////////////
// ⛔ WARNING eval() IS BAD CODE ⛔ //
// console.log(eval(currDir + ".files")); //{ f: 29116, g: 2557, 'h.lst': 62596 }

// changeDirectory("cd ..");
// changeDirectory("cd ..");

/****************************/
/*********OLD CODE***********/
/****************************/

// Object.defineProperty(
// 	eval("inputFileStructure." + inputDir),
// 	"dir",
// 	{
// 		value: 0,
// 		writable: true,
// 	}
// );

// eval(inputDir + ".dir") = {};

//    if (!eval(inputDir + ".dir")) {eval(inputDir + ".dir") = {}};
//     eval(inputDir + ".dir." + arr[i].slice(5)) = {};

// Object.defineProperty(
// 		// eval(inputFileStructure + ".dir"),
// 		eval(inputFileStructure).dir,
// 		newDir,
// 		{
// 			value: new Object(),
// 		}
//   );
