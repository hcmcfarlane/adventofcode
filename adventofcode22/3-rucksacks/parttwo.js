//run as node.exe main.js > log.txt to see full log

import fs from "node:fs";

// console.log("***This is a test version***");

/**
    Format the input file into an array of arrays of three strings
**/
const input = fs.readFileSync("input.txt", "utf8", (err, data) => {
  if (err) throw err;
});
function formatInput(string) {
    const initialArr = string.split("\r\n");
    let arr = [];
    for (let i = 0; i < initialArr.length; i+=3) {
        arr[i/3] = [initialArr[i], initialArr[i+1], initialArr[i+2]]
    }
    return arr;
}
// console.log(formatInput(input))


/** 
    Creates array from alphabet to create the priority list
**/
function formatAlphabet() {
    const alphaString = fs.readFileSync("alphabet.txt", "utf8", (err, data) => {
        if (err) throw err;
    })
    let alphaArr = alphaString.split("")
    return alphaArr
}
let alphaArr = formatAlphabet();

/** Finds the 'priority' of each item type in rucksack: 
    a–z have priorities 1–26.
    A–Z have priorities 27–52.
**/
function findPriority(letter) {
    const equality = (i) => i === letter;
    return alphaArr.findIndex(equality) + 1;
}

const rucksacks = formatInput(input);

function findDupesByGroup(groupOfRucksacks) {
    let dupeList = [];
    let commonItem = [];
    const [r1, r2, r3] = groupOfRucksacks;
    const [s1, s2, s3] = [r1.split(""), r2.split(""), r3.split("")];
    s2.forEach(item => {
        if (!dupeList.includes(item)) {
            if (s1.includes(item)) {
                dupeList.push(item)
            }
        };
    });
    s3.forEach(item => {
        if (!commonItem.includes(item)) {
            if (dupeList.includes(item)) {
                commonItem.push(item)
            }
        }
    })
    return commonItem;
}

function calculatePriorities() {
    let prioritiesArray = [];
    // const reducedRucksacks = rucksacks.slice(0, 3);
    rucksacks.forEach((group) => {
        let badge = findDupesByGroup(group);
        // console.log("badge", badge);
        badge.forEach(b => {
            prioritiesArray.push(findPriority(b))
        })

        // let priority = findPriority(badge);
        // console.log("priority", priority)
        // prioritiesArray.push(priority);
    });
    return prioritiesArray;
}

// get array of priorities
let arrOfPriorities = calculatePriorities()
console.log("priority for rucksacks", arrOfPriorities)

//sum the array of priorities
console.log("The sum of badge priorities is: ", arrOfPriorities.reduce((a,b) => a+b, 0))
