import { NextFunction, Request, Response } from 'express';
import { Logger } from '../config/logger';

export const errorHanldingMiddleware = (error: any, req: Request, res: Response, next: NextFunction) => {
    const errorArgs = {
        method: req.method,
        body: req.body,
        params: req.params,
        message: error.message
    };
    Logger.error({ ...errorArgs });
    return res.status(500).send(errorArgs);
};
