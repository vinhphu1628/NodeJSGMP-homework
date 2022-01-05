import { Router } from 'express';

import { resetDatabase } from '../controllers/dbControllers';

const dbRouter = Router();

// reset database
dbRouter.post('/reset', resetDatabase);

export default dbRouter;
