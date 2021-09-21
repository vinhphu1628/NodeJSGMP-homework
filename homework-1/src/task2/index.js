const csv = require("csvtojson");
const fs = require("fs");

const path = __dirname;
const csvFilePath = `src/csv/nodejs-hw1-ex1.csv`;

const readStream = fs.createReadStream(csvFilePath);
const writeStream = fs.createWriteStream(`${path}/jsonData.txt`);

readStream.on("error", (error) => {
  console.error(error);
})
writeStream.on("error", (error) => {
  console.error(error);
})

readStream.pipe(csv()).pipe(writeStream);

