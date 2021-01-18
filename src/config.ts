import * as env from 'env-var';
import { CollectionProducer } from './collectionProducer/collectionProducer.interface';
import { fileIndexParser } from './collectionResponse/parser/file.parser.middleware';
import { permissionHiParser, permissionIndexParser } from './collectionResponse/parser/permission.parser.middleware';

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
  apmConfig: {
    secretToken: env.get('APM_SECRET_TOKEN').default('').asString(),
    verifyServerCert: env
        .get('ELASTIC_APM_VERIFY_SERVER_CERT')
        .default('false')
        .asBool(),
    apmURL: env
        .get('ELASTIC_APM_SERVER_URL')
        .default('http://localhost:8200')
        .asUrlString(),
  },
  logger: {
    options: {
      hosts: esHost && esHost.split(','),
      httpAuth: `${esUser}:${esPass}`,
    },
    indexPrefix: process.env.LOG_INDEX || 'kdrive',
  },
  collections: {
    file: env.get('FILE_COLLECTION').default('files').asString(),
    premission:  env.get('PERMISSION_COLLECTION').default('permissions').asString()
  },
  queues: {
    IndexQueue: env.get('INDEX_QUEUE').default('indexQueue').asString(),
    hiQueue: env.get('HI_QUEUE').default('hiQueue').asString()
  }
};

export let collectionProducers = {
  file: new CollectionProducer({
    collection: config.collections.file,
    rabbitmqUrl: config.rabbit.url,
    queues: [{ name: config.queues.IndexQueue, middleware: fileIndexParser }],
  }),
  permission: new CollectionProducer({
    collection: config.collections.premission,
    rabbitmqUrl: config.rabbit.url,
    queues: [
      { name: config.queues.IndexQueue, middleware: permissionIndexParser },
      { name: config.queues.hiQueue, middleware: permissionHiParser }
    ],
  })
};

// index pattern for the logger
export const indexTemplateMapping = require('winston-elasticsearch/index-template-mapping.json');
indexTemplateMapping.index_patterns = `${config.logger.indexPrefix}-*`;

export default config;
