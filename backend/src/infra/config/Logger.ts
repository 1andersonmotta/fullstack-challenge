import pino from 'pino';

const LoggerPino = pino({
    level: 'debug',
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true,
        },
    },
});

const Logger = {
    info: (message: any | any[]) => LoggerPino.info(message),
    error: (message: any | any[]) => LoggerPino.error(JSON.stringify(message)),
    debug: (message: any | any[]) => LoggerPino.debug(message),
}


export default Logger;