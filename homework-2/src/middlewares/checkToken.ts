import jwt from 'jsonwebtoken';

import { NextFunction, Request, Response } from 'express';

export const checkTokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (!token) {
        return res.status(401).send({ message: 'No token provided.' });
    }

    try {
        jwt.verify(token, process.env.SECRET_KEY ?? '');
        return next();
    } catch (err) {
        return res.status(403).send({ message: 'Invalid Token' });
    }
};
