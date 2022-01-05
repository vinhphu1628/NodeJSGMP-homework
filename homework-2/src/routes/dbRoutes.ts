import { Router } from 'express';

import { resetDatabase } from '../controllers/dbControllers';
import { checkTokenMiddleware } from '../middlewares/checkToken';
import { loggerMiddleware } from '../middlewares/logger';

const dbRouter = Router();

// reset database
dbRouter.post('/reset', loggerMiddleware, checkTokenMiddleware, resetDatabase);

export default dbRouter;
