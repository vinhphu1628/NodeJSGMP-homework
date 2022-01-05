"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dbControllers_1 = require("../controllers/dbControllers");
const logger_1 = require("../middlewares/logger");
const dbRouter = (0, express_1.Router)();
// reset database
dbRouter.post('/reset', logger_1.loggerMiddleware, dbControllers_1.resetDatabaseController);
exports.default = dbRouter;
