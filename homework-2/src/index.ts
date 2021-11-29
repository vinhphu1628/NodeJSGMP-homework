import express from 'express';

import userRouter from './routes/userRoutes';
import dbRouter from './routes/dbRoutes';
import groupRouter from './routes/groupRoutes';
import { testConnection } from './config/dbConfig';
import { Logger } from './config/logger';
import { errorHanldingMiddleware } from './middlewares/errorHandling';

import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3000;

testConnection();

app.use(express.json());

app.use(dbRouter);

app.use(userRouter);

app.use(groupRouter);

app.use(errorHanldingMiddleware);

process.on('uncaughtException', (error: Error) => {
    if (error) {
        Logger.error(`Caught exception: ${error}`);
        process.exit(1);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at https://localhost:${PORT}`);
});
