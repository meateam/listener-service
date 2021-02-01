import * as env from 'env-var';
import { CollectionProducer } from './collectionProducer/collectionProducer.interface';
import { fileIndexParser } from './responseProducer/parser/file.parser.middleware';
import { permissionHiParser, permissionIndexParser } from './responseProducer/parser/permission.parser.middleware';
import { QueueObjectType } from './mongo-rabbit/src/paramTypes';

const esHost = env.get('ELASTICSEARCH_URL').default('http://localhost:9200').asString();
const esUser = env.get('ELASTICSEARCH_USER').default('');
const esPass = env.get('ELASTICSEARCH_PASSWORD').default('');

const config = {
  service: {
    port: env.get('LSNR_PORT').default(8080).asPortNumber(),
    host: env.get('LSNR_HOST').default('0.0.0.0').asString(),
    name: env.get('LSNR_SERVICE_NAME').default('listener-service').asString(),
    debugMode: env.get('LSNR_DEBUG_MODE').default(1).asBool(), // TODO: change to prod
  },
  mongo: {
    uri: env.get('MONGO_HOST').default('mongodb://127.0.0.1:27017,127.0.0.1:27018,127.0.0.1:27019/devDB?replicaSet=rs0').asString()
  },
  rabbit: {
    url: env.get('LSNR_RABBIT_HOST').default('amqp://localhost').asString()
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
    file: env.get('LSNR_FILE_COLLECTION').default('files').asString(),
    premission:  env.get('LSNR_PERMISSION_COLLECTION').default('permissions').asString()
  },
  queues: {
    IndexQueue: {
      name: env.get('LSNR_INDEX_QUEUE').default('events').asString(),
      exchange: env.get('LSNR_INDEX_QUEUE_EXCHANGE').default('indexService').asString(),
      routingKey: env.get('LSNR_INDEX_QUEUE_ROUTING_KEY').default('eventsKey').asString(),
    },
    hiQueue: env.get('LSNR_HI_QUEUE').default('hiQueue').asString()
  }
};

export const indexqueue: QueueObjectType =  {
  name: config.queues.IndexQueue.name,
  exchange: {
    name:config.queues.IndexQueue.exchange,
    type: 'direct',
    routingKey: config.queues.IndexQueue.routingKey
  },
};

export let collectionProducers = {
  file: new CollectionProducer({
    collection: config.collections.file,
    queues: [Object.assign({}, indexqueue, { middleware: fileIndexParser })],
  }),
  permission: new CollectionProducer({
    collection: config.collections.premission,
    queues: [
      Object.assign({}, indexqueue, { middleware: permissionIndexParser }),
      { name: config.queues.hiQueue,
        middleware: permissionHiParser,
      }
    ],
  })
};

// index pattern for the logger
export const indexTemplateMapping = require('winston-elasticsearch/index-template-mapping.json');
indexTemplateMapping.index_patterns = `${config.logger.indexPrefix}-*`;

export default config;
