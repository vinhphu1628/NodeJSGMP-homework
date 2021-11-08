import { Router } from 'express';

import { resetDatabaseController } from '../controllers/dbControllers';

const dbRouter = Router();

// reset database
dbRouter.post('/reset', resetDatabaseController);

export default dbRouter;
