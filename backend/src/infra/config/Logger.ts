import winston from 'winston';

const Logger = winston.createLogger({});

if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
    Logger.add(
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            ),
        })
    );
}

export default Logger;