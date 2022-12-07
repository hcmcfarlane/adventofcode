import fs from "node:fs";

const input = fs.readFileSync("inputtest.txt", "utf-8", (err, data) => {
	if (err) throw err;
});

function formatTestInput(input) {
	let arr = input.split("\r\n");
	return arr;
}
let code = formatTestInput(input);
console.log("code", code);

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

// const object1 = {
//     a: 'somestring',
//     b: 42
//   };

//   for (const [key, value] of Object.entries(object1)) {
//     console.log(`${key}: ${value}`);
//   }

let totalFileSize = 0;
function loopThroughDirectories(directory) {
	// console.log("directory", directory);
	// console.log(Object.hasOwn(eval(directory), "dir"));
	calcFileSize(directory, true);
	if (Object.hasOwn(eval(directory), "dir")) {
		//TODO:
		// for (LOOP OVER EACH KEY IN currDir.dir) {
		console.log("inside if");
		// console.log(eval(directory + ".dir"));
		for (const [key, value] of Object.entries(eval(directory + ".dir"))) {
			// calcFileSize(directory, true);
			console.log("value", value, "key", key);
			changeDirectory(`cd ${key}`);

			//TODO:
			//to count nested directories more than once???
			// calcFileSize(currDir, true);

			loopThroughDirectories(currDir);
		}
		// calcFileSize(currDir);
		changeDirectory(`cd ..`);
	} else {
		console.log("inside else");
		// if ((currDir = directory)) {
		// 	calcFileSize(directory);
		// } else {
		// 	calcFileSize(currDir);
		// 	calcFileSize(directory);
		// }
		calcFileSize(directory, false);
	}
	changeDirectory(`cd ..`);

	return;
}

let fileSizeLimit = 100000;
let sumOfSmallDirs = 0;
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

changeDirectory("cd /");
loopThroughDirectories(currDir);
// changeDirectory("cd e");

// console.log(`${currDir}`); //fileStructure.home.dir.a
// console.log(`${currDir}[files]`); //fileStructure.home.dir.a[files]
/////////////////////////////////////
// ⛔ WARNING eval() IS BAD CODE ⛔ //
// console.log(eval(currDir + ".files")); //{ f: 29116, g: 2557, 'h.lst': 62596 }

// changeDirectory("cd ..");
// changeDirectory("cd ..");

// console.log(currDir.entries(eval(currDir.dir)));
