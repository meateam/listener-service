export const mongoConnectionString: string = process.env.MONGO_HOST || 'mongodb://127.0.0.1:27017,127.0.0.1:27018,127.0.0.1:27019/devDB?replicaSet=rs0';
export const rabbitURI: string = process.env.RABBIT_HOST || 'amqp://localhost';

export const colToQueueArray: ColToQueue[] = [
  {
    collection: 'files',
    queue: 'filesQueue'
  },
  {
    collection: 'permissions',
    queue: 'permissionsQueue'
  },
];

export type ColToQueue = {
  collection: string;
  queue: string;
};

// ********************************************************************************************************* //
// **************************************** LOGGER-RELATED CONFIGS  **************************************** //
// ********************************************************************************************************* //

// Whether or not to use elastic for the logger.
export let useElastic : boolean = process.env.ELASTICSEARCH_URL !== undefined;

const esHost: string = process.env.ELASTICSEARCH_URL || 'http://localhost:9200';
const esUser: string = process.env.ELASTICSEARCH_USER || '';
const esPass: string = process.env.ELASTICSEARCH_PASSWORD || '';
export const confLogger = {
  options: {
    hosts: esHost && esHost.split(','),
    httpAuth: `${esUser}:${esPass}`,
  },
  indexPrefix: process.env.LOG_INDEX || 'kdrive',
};

export const debugMode: boolean = process.env.DEBUG_MODE === 'true';

// index pattern for the logger
export const indexTemplateMapping = require('winston-elasticsearch/index-template-mapping.json');
indexTemplateMapping.index_patterns = `${confLogger.indexPrefix}-*`;

export const serviceName: string = 'listener-service';

// Router
export const port : string = process.env.PORT || '3000';
