import express from 'express';
import 'dotenv/config';
import { testConnection } from './config/dbConfig';
import userRouter from './routes/userRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

testConnection();

app.use(express.json());

app.use(userRouter);

app.listen(PORT, () => {
    console.log(`Server is running at https://localhost:${PORT}`);
});
