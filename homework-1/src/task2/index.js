const csv = require("csvtojson");
const fs = require("fs");

const path = __dirname;
const csvFilePath = `src/csv/nodejs-hw1-ex1.csv`;
csv()
  .fromFile(csvFilePath)
  .then((jsonObj) => {
    console.log("JSON Object: ", JSON.stringify(jsonObj));
    fs.writeFile(`${path}/jsonData.txt`, JSON.stringify(jsonObj), (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Saved!");
      }
    });
  });
