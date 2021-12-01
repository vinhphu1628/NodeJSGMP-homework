import { NextFunction, Request, Response } from 'express';
import { Logger } from '../config/logger';

export const errorHanldingMiddleware = (error: any, req: Request, res: Response, next: NextFunction) => {
    Logger.error(error);
    return res.status(500).send({
        method: req.method,
        body: req.body,
        params: req.params,
        message: error.message
    });
};
