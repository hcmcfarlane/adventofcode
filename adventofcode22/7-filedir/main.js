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

let fileSizes = 0;
function loopThroughDirectories(directory) {
	// console.log("directory", directory);
	// console.log(Object.hasOwn(eval(directory), "dir"));
	if (Object.hasOwn(eval(directory), "dir")) {
		//TODO:
		// for (LOOP OVER EACH KEY IN currDir.dir) {
		console.log("inside if");
		// console.log(eval(directory + ".dir"));
		calcFileSize(directory);
		for (const [key, value] of Object.entries(eval(directory + ".dir"))) {
			console.log("value", value, "key", key);
			changeDirectory(`cd ${key}`);
			loopThroughDirectories(currDir);
		}
		// changeDirectory(`cd ..`);
		// calcFileSize(currDir);
	} else {
		console.log("inside else");
		calcFileSize(directory);
	}
	changeDirectory(`cd ..`);

	return;
}

function calcFileSize(directory) {
	for (const [key, value] of Object.entries(eval(directory + ".files"))) {
		console.log("value", value, "key", key);
		fileSizes += value;
	}
	console.log("fileSizes", fileSizes);
	return fileSizes;
}

// changeDirectory("cd a");
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
