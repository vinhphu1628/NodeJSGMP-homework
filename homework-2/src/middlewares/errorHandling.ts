import { Request, Response } from 'express';
import { Logger } from '../config/logger';

export const errorHanldingMiddleware = (error: any, req: Request, res: Response) => {
    Logger.error(error.message);
    return res.status(500).send({
        method: req.method,
        body: req.body,
        params: req.params,
        message: error.message
    });
};
