"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const dbRoutes_1 = __importDefault(require("./routes/dbRoutes"));
const groupRoutes_1 = __importDefault(require("./routes/groupRoutes"));
const dbConfig_1 = require("./config/dbConfig");
const logger_1 = require("./config/logger");
require("dotenv/config");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
(0, dbConfig_1.testConnection)();
app.use(express_1.default.json());
app.use(dbRoutes_1.default);
app.use(userRoutes_1.default);
app.use(groupRoutes_1.default);
app.use((err, req, res) => {
    console.log('hello');
    logger_1.Logger.error(err.message);
    return res.status(500).send({
        status: 500,
        message: err.message
    });
});
process.on('uncaughtException', (error) => {
    if (error) {
        logger_1.Logger.error(`Caught exception: ${error}`);
        process.exit(1);
    }
});
app.listen(PORT, () => {
    console.log(`Server is running at https://localhost:${PORT}`);
});
