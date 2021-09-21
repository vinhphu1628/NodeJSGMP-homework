"use strict";

var readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout
});

var reverseString = function reverseString(input) {
  return input.split("").reverse().join("");
};

var main = function main() {
  return readline.question("", function (input) {
    console.log("".concat(reverseString(input), "\n"));
    main();
  });
};

main();