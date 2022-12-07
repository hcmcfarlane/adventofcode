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
						dir: {},
						files: { i: 58 },
					},
				},
				files: { f: 29116, g: 2557, "h.lst": 62596 },
			},
			d: {
				dir: {},
				files: { j: 4060174, "d.log": 8033020, k: 7214296 },
			},
		},
		files: { "b.txt": 14848514, "c.dat": 8504156 },
	},
};

let currDir = "fileStructure.home";

function changeDirectory(code) {
	if (code === "cd /") {
		currDir = "fileStructure.home";
		return;
	}
	if (code === "cd ..") {
		if ((currDir = "fileStructure.home")) {
			return;
		} else {
			dirArray = currDir.split(".");
			console.log("dirArray", dirArray);
			currDir = dirArray.pop().join(".");
			console.log("currDir", currDir);
			// currDir =
		}
	}

	let [action, newDir] = code.split(" ");

	currDir = currDir + ".dir." + `${newDir}`;
	console.log("currDir", currDir);
	return;
}

changeDirectory("cd a");

console.log(`${currDir}`); //fileStructure.home.dir.a
console.log(`${currDir}[files]`); //fileStructure.home.dir.a[files]
/////////////////////////////////////
// ⛔ WARNING THIS IS BAD CODE ⛔ //
console.log(eval(currDir + ".files")); //{ f: 29116, g: 2557, 'h.lst': 62596 }

changeDirectory("cd ..");
