const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const reverseString = (input) => {
  return input.split("").reverse().join("");
};

readline.question("Please input a string: ", (input) => {
  console.log("Result:", reverseString(input));
  readline.close();
});
