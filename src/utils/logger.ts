import * as winston from 'winston';
import * as os from 'os';
import * as elasticsearch from 'winston-elasticsearch';
import { confLogger, debugMode, useElastic, indexTemplateMapping, serviceName } from '../config';

export const logger: winston.Logger = winston.createLogger({
  defaultMeta: { service: serviceName, hostname: os.hostname() },
});

// configure logger
if (useElastic) {
  const es = new elasticsearch.default({
    indexPrefix: confLogger.indexPrefix,
    level: 'verbose',
    clientOpts: confLogger.options,
    bufferLimit: 100,
    messageType: 'log',
    ensureMappingTemplate: true,
    mappingTemplate: indexTemplateMapping,
  });
  logger.add(es);
}

if (debugMode) {
  const consoleLogger = new winston.transports.Console();
  logger.add(consoleLogger);
}

/**
 * logs the data with its given parameters.
 * @param severity - the kind of log created.
 * @param name - name of the log. in our case, the function called.
 * @param description - description in text.
 * @param traceID - id to correlate to if there are several logs with some connection.
 * @param user - the user requesting for the service.
 * @param meta - additional optional information.
 */
export const log = (level: Severity, message: string, name: string, traceID?: string, meta?: object) => {
  logger.log(level, message, { ...meta, traceID, method: name });
};

export enum Severity {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  VERBOSE = 'verbose',
  DEBUG = 'debug',
  SILLY = 'silly',
}
