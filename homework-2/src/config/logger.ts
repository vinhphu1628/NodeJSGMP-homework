import winston from 'winston';

const { combine, splat, printf, colorize } = winston.format;

const myFormat = printf(({ level, message, ...metadata }) => {
    let msg = `[${level}] : ${message} `;
    if (metadata) {
        msg += JSON.stringify(metadata);
    }
    return msg;
});

const logConfiguration: winston.LoggerOptions = {
    transports: [
        new winston.transports.Console()
    ],
    format: combine(
        colorize(),
        splat(),
        myFormat
    )
};

export const Logger = winston.createLogger(logConfiguration);
