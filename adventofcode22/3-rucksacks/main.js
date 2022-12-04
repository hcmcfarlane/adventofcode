//run as node.exe main.js > log.txt to see full log

import fs from "node:fs";

// console.log("***This is the test version***");

/**
    Format the input file into an array of strings
**/
// const input = fs.readFileSync("inputtest.txt", "utf8", (err, data) => {
const input = fs.readFileSync("input.txt", "utf8", (err, data) => {
  if (err) throw err;
});
function formatInput(string) {
    const arr = string.split("\r\n");
    return arr;
}

/** 
    Creates array from alphabet to create the priority list
**/
let alphaArr = [];
function formatAlphabet() {
    const alphaString = fs.readFileSync("alphabet.txt", "utf8", (err, data) => {
        if (err) throw err;
    })
    alphaArr = alphaString.split("")
    return alphaArr
}
formatAlphabet();
// console.log("alphaArr", alphaArr)


/**
    Find duplicates from both compartments
**/
function findDupes(rucksack) {
    let duplicateItems = [];
    let comp1 = rucksack.slice(0, (rucksack.length/2)).split("");
    let comp2 = rucksack.slice(rucksack.length/2).split("");
    // console.log("compartments", [comp1, comp2], [comp1.length, comp2.length])

    comp2.forEach(j => {
        // Push the duplicated item to the list only if it's not already there
        duplicateItems.includes(j) ? duplicateItems : comp1.includes(j) ? duplicateItems.push(j) : duplicateItems
    });

    // console.log("duplicateItems", duplicateItems)
    return duplicateItems
}

/** Finds the 'priority' of each item type in rucksack: 
    a–z have priorities 1–26.
    A–Z have priorities 27–52.
**/
function findPriority(letter) {
    const equality = (i) => i === letter;
    return alphaArr.findIndex(equality) + 1;
}

const rucksacks = formatInput(input)
// console.log("rucksacks", rucksacks);

let sumOfPrioritiesArr = [];
let dupes = [];

function sumPriorities() {
    // for each rucksack in 'rucksacks'
    // - find the duplicate items as an array
    // - find the priority for each item
    // - return the sum of the priorities

    rucksacks.forEach(rucksack => {
        dupes.push(...findDupes(rucksack));
    })
    dupes.forEach((d) => {
        sumOfPrioritiesArr.push(findPriority(d));
    })

    console.log("array of priorities:")
    console.dir(sumOfPrioritiesArr, { maxArrayLength: null })
return sumOfPrioritiesArr.reduce((a, b) => a + b, 0)
}

console.log("sum of array:", sumPriorities())
