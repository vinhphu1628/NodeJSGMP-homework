import { Request, Response, NextFunction } from 'express';

import { Logger } from '../config/logger';

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    Logger.info(`Request: ${req.method} ${req.url}`, req.body);
    next();
};
