import express from 'express';
import cors from 'cors';

import userRouter from './routes/userRoutes';
import dbRouter from './routes/dbRoutes';
import groupRouter from './routes/groupRoutes';
import authRouter from './routes/authRoutes';
import { testConnection } from './config/dbConfig';
import { Logger } from './config/logger';
import { errorHanldingMiddleware } from './middlewares/errorHandling';

import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3000;

testConnection();

app.use(express.json());

app.use(cors());

app.use(dbRouter);

app.use(userRouter);

app.use(groupRouter);

app.use(authRouter);

app.use(errorHanldingMiddleware);

process.on('uncaughtException', (error: Error) => {
    Logger.error(`Caught Exception: ${error}`);
    process.exit(1);
}).on('unhandledRejection', (error: Error) => {
    Logger.error(`Caught Rejection: ${error}`);
});

app.listen(PORT, () => {
    console.log(`Server is running at https://localhost:${PORT}`);
});
