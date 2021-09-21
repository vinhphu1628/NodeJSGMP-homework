"use strict";

var csv = require("csvtojson");

var fs = require("fs");

var path = __dirname;
var csvFilePath = "src/csv/nodejs-hw1-ex1.csv";
var readStream = fs.createReadStream(csvFilePath);
var writeStream = fs.createWriteStream("".concat(path, "/jsonData.txt"));
readStream.pipe(csv()).pipe(writeStream);