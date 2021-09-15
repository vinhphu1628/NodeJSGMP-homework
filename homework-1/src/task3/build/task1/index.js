"use strict";

var readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout
});

var reverseString = function reverseString(input) {
  return input.split("").reverse().join("");
};

readline.question("Please input a string: ", function (input) {
  console.log("Result:", reverseString(input));
  readline.close();
});