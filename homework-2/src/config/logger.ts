import winston from 'winston';

const { combine, printf, colorize, timestamp } = winston.format;

const myFormat = printf(({ level, message, ...metadata }) => {
    let msg = `[${level}] : ${message} `;
    if (metadata) {
        msg += JSON.stringify(metadata);
    }
    return msg;
});

const logConfiguration: winston.LoggerOptions = {
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'error.log', level: 'error' })
    ],
    format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
        colorize(),
        myFormat
    )
};

export const Logger = winston.createLogger(logConfiguration);
