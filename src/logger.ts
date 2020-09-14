import * as winston from 'winston';
import * as os from 'os';
import * as Elasticsearch from 'winston-elasticsearch';
import { confLogger, debugMode } from './config';
// index pattern for the logger
const indexTemplateMapping = require('winston-elasticsearch/index-template-mapping.json');
indexTemplateMapping.index_patterns = `${confLogger.indexPrefix}-*`;

const serviceName: string = 'listener-service';

export const logger: winston.Logger = winston.createLogger({
  defaultMeta: { service: serviceName, hostname: os.hostname() },
});

// configure logger
const elasticsearch = new Elasticsearch.default({
  indexPrefix: confLogger.indexPrefix,
  level: 'verbose',
  clientOpts: confLogger.options,
  bufferLimit: 100,
  messageType: 'log',
  ensureMappingTemplate: true,
  mappingTemplate: indexTemplateMapping,
});
logger.add(elasticsearch);

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
  // Console logs for debugging only.
  if (debugMode) {
    if (traceID) {
      console.log(`level: ${level}, message: ${message}, name: ${name}, traceID: ${traceID}, meta:`);
    } else {
      console.log(`level: ${level}, message: ${message}, name: ${name}, meta:`);
    }
    if (meta) {
      console.log(meta);
    }
  }
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
