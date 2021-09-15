"use strict";

var csv = require("csvtojson");

var fs = require("fs");

var path = __dirname;
var csvFilePath = "src/csv/nodejs-hw1-ex1.csv";
csv().fromFile(csvFilePath).then(function (jsonObj) {
  console.log("JSON Object: ", JSON.stringify(jsonObj));
  fs.writeFile("".concat(path, "/jsonData.txt"), JSON.stringify(jsonObj), function (error) {
    if (error) {
      console.log(error);
    } else {
      console.log("Saved!");
    }
  });
});