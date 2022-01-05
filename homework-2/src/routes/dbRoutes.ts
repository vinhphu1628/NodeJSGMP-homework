import { Router } from 'express';

import { resetDatabase } from '../controllers/dbControllers';
import { loggerMiddleware } from '../middlewares/logger';

const dbRouter = Router();

// reset database
dbRouter.post('/reset', loggerMiddleware, resetDatabase);

export default dbRouter;
