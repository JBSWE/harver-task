import pino from 'pino';

import { ProcessEnv } from '../config';
import * as config from '../config';

const isDevelopmentOrTestStage = !process.env.NODE_ENV || ['development', 'test'].includes(process.env.NODE_ENV);
const prettyPrintLoggerTransport = isDevelopmentOrTestStage && {
    target: 'pino-pretty',
    options: {
        colorize: true,
    },
};

export const applicationLogger = pino({
    transport: prettyPrintLoggerTransport || undefined,
    messageKey: 'message',
    level: config.getString(ProcessEnv.logLevel),
    redact: ['req.headers.authorization', 'req.headers["api-key"]'],
    formatters: {
        level(label: string): { level: string } {
            return { level: label };
        },
    },
});
