import fs from "node:fs";

const input = fs.readFileSync("input.txt", "utf-8", (err, data) => {
	if (err) throw err;
});

let inputFileStructure = { home: {} };
let inputDir = "inputFileStructure.home";
const homeDirectory = "inputFileStructure.home";
// let inputDir = "home";

// console.log("initial inputFileStruct", inputFileStructure);

function formatTestInput(input) {
	let arr = input.split("\r\n");
	// console.log(arr[1].slice(0, 4));
	for (let i = 0; i < arr.length; i++) {
		// console.log("%:", arr[i]);
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
				// console.log("Do some stuff with ls here");
				// grab everything up until the next $ command
				// ignore the dirs (dealt with elsewhere)
				// for everything else (i.e. starts with a number)
				// first, create a files {} if not already exists
				// then grab the file name as a key and add to files object
				// value of the file name as key will be the number (CONVERT)

				let nextCommandIndex = i + 1;
				let nextCommandChar = arr[nextCommandIndex][0];
				findNumOfLS: while (nextCommandChar != "$") {
					// console.log(!arr[nextCommandIndex++]);
					nextCommandIndex++;
					if (!arr[nextCommandIndex]) {
						break findNumOfLS;
					}
					nextCommandChar = arr[nextCommandIndex][0];
				}
				let numCommands = nextCommandIndex - i - 1;

				let lsList = arr.slice(i + 1, nextCommandIndex);

				//create files obj:
				if (!Object.hasOwn(eval(inputDir), "files")) {
					eval(inputDir).files = {};
				}

				// console.log("lsList", lsList);
				let fileList = lsList.filter((file) => file[0] !== "d");
				// console.log("fileList", fileList);
				if (fileList.length >= 1) {
					let fileMap = [];
					for (let j = 0; j < fileList.length; j++) {
						fileMap[j] = fileList[j].split(" ").reverse();
						// console.log("fileList", fileList);
						fileMap[j][1] = parseInt(fileMap[j][1]);
						// console.log("fileMap", fileMap);
					}
					// add fileMap to fileStructure using .entries()
					const fileMapper = new Map(fileMap);
					eval(inputDir).files = Object.fromEntries(fileMapper);
				}

				// const entries = new Map([
				//     ['foo', 'bar'],
				//     ['baz', 42]
				//   ]);

				//   const obj = Object.fromEntries(entries);

				//   console.log(obj);
				// expected output: Object { foo: "bar", baz: 42 }

				// console.log("numCommands", numCommands);
			} else {
				throw new Error("ERROR: Unexpected input beginning with `$`");
				// console.log("ERROR: Unexpected input beginning with `$`");
			}
		} else if (arr[i].slice(0, 3) === "dir") {
			//TODO:
			// create a directory here
			let newDir = arr[i].slice(4);
			// console.log("newDir", newDir);
			// console.log("inputDir", inputDir);

			//check if dir already exists, if not, create it
			// console.log(
			// "check whether dir exists:",
			// Object.hasOwn(eval(inputDir), "dir")
			// );
			if (!Object.hasOwn(eval(inputDir), "dir")) {
				eval(inputDir).dir = {};
				// console.log("object after creating .dir", inputFileStructure);
			}

			//check if dir.newDir exists, if not, create it
			// console.log(
			// 	`check whether dir.newDir (${newDir}) exists:`,
			// 	Object.hasOwn(`${inputDir}.dir`, newDir)
			// );
			if (!Object.hasOwn(`${inputDir}.dir`, newDir)) {
				eval(inputDir).dir[newDir] = {};
				// console.log(
				// "object after creating .dir.newDir",
				// inputFileStructure
				// );
			}

			// console.log(inputFileStructure);
		} else if (typeof parseInt(arr[i][0]) === "number") {
			//TODO:
			// "Will deal with files in the ls section, can ignore this"
		} else {
			throw new Error("ERROR: Unexpected input in file");
			// console.log("ERROR: Unexpected input in file");
		}
		// console.log("inputDir", inputDir, "\n------------");
	}
	return arr;
}

// const str = "51254";
// console.log(str[0]);
// console.log(str, typeof parseInt(str[0]));

let code = formatTestInput(input);
// let code = formatTestInput("$ cd a\r\n$ cd ..");
// let code = formatTestInput("$ cd a");
// console.log("code", code);
console.dir(inputFileStructure, { depth: null });

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
		currDir = homeDirectory;
	} else if (code === "cd ..") {
		if (currDir === homeDirectory) {
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
	// console.log("currDir after calling changeDirectory", currDir);
	return;
}

function loopThroughDirectories(directory) {
	console.log("directory", directory);
	// console.log(Object.hasOwn(eval(directory), "dir"));
	// console.log("current directory for loop:", directory);
	calcFileSize(directory, true);
	if (Object.hasOwn(eval(directory), "dir")) {
		// for (LOOP OVER EACH KEY IN currDir.dir) {
		// console.log("inside if");
		// console.log(eval(directory + ".dir"));

		//if directory has a directory below it but it ISN'T a top-level directory (i.e. a or d)
		// then calcFileSize(directory, false)

		let tempDirectory = directory.split(".");
		tempDirectory.pop();
		tempDirectory.pop();
		tempDirectory = tempDirectory.join(".");
		// console.log("tempDirectory", tempDirectory);

		if (tempDirectory === homeDirectory) {
		} else {
			calcFileSize(directory, false);
		}
		for (const [key, value] of Object.entries(eval(directory + ".dir"))) {
			// calcFileSize(directory, true);
			// console.log("key", key, "\nvalue", value, "\n");
			changeDirectory(`cd ${key}`);
			loopThroughDirectories(currDir);
		}
		changeDirectory(`cd ..`);
	} else {
		// console.log("inside else");
		calcFileSize(directory, false);
	}
	changeDirectory(`cd ..`);

	return;
}

function calcFileSize(directory, addToTotal) {
	let currFileSize = 0;
	for (const [key, value] of Object.entries(eval(directory + ".files"))) {
		// console.log("value", value, "key", key);
		addToTotal ? (totalFileSize += value) : totalFileSize;
		currFileSize += value;
	}
	currFileSize <= fileSizeLimit
		? (sumOfSmallDirs += currFileSize)
		: sumOfSmallDirs;
	// console.log("currFileSize", currFileSize);
	// console.log("totalFileSize", totalFileSize);
	// console.log("sumOfSmallDirs", sumOfSmallDirs);

	return [currFileSize, totalFileSize, sumOfSmallDirs];
}

currDir = inputDir;
fileStructure = inputFileStructure;
changeDirectory("cd /");
loopThroughDirectories(currDir);
console.log("currDir", currDir);
console.log("totalFileSize", totalFileSize);
console.log("sumOfSmallDirs", sumOfSmallDirs);
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
