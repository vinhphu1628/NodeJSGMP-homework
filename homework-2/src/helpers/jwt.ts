import jwt from 'jsonwebtoken';

import 'dotenv/config';

export const generateAccessToken = (username: string) => {
    return jwt.sign({ username }, process.env.SECRET_KEY ?? '', { expiresIn: '10m' });
};
