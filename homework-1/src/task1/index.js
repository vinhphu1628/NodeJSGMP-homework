const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const reverseString = (input) => {
  return input.split("").reverse().join("");
};

const main = () => readline.question("", (input) => {
  console.log(`${reverseString(input)}\n`);
  main();
});

main();