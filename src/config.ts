import * as env from 'env-var';

const esHost = env.get('ELASTICSEARCH_URL').default('http://localhost:9200').asString();
const esUser = env.get('ELASTICSEARCH_USER').default('');
const esPass = env.get('ELASTICSEARCH_PASSWORD').default('');

const config = {
  service: {
    port: env.get('PORT').default(8080).asPortNumber(),
    name: env.get('LSNR_SERVICE_NAME').default('listener-service').asString(),
    debugMode: env.get('DEBUG_MODE').default(1).asBool(),
  },
  mongo: {
    uri: env.get('MONGO_HOST').default('mongodb://127.0.0.1:27017,127.0.0.1:27018,127.0.0.1:27019/devDB?replicaSet=rs0').asString()
  },
  rabbit: {
    url: env.get('RABBIT_HOST').default('amqp://localhost').asString()
  },
  elasticsearch: {
    esHost,
    esUser,
    esPass,
  },
  logger: {
    options: {
      hosts: esHost && esHost.split(','),
      httpAuth: `${esUser}:${esPass}`,
    },
    indexPrefix: process.env.LOG_INDEX || 'kdrive',
  }

};

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

// index pattern for the logger
export const indexTemplateMapping = require('winston-elasticsearch/index-template-mapping.json');
indexTemplateMapping.index_patterns = `${config.logger.indexPrefix}-*`;

export default config;
