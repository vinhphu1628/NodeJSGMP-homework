"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerMiddleware = void 0;
const logger_1 = require("../config/logger");
const loggerMiddleware = (req, res, next) => {
    logger_1.Logger.info(`Request: ${req.method} ${req.url}`, req.body);
    next();
};
exports.loggerMiddleware = loggerMiddleware;
