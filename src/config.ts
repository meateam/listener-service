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

// Logger-Related configs

// Whether or not to use elastic for the logger.
export const useElastic : boolean = process.env.ELASTICSEARCH_URL !== '';

const esHost: string = process.env.ELASTICSEARCH_URL || 'http://localhost:9200';
const esUser: string = process.env.ELASTICSEARCH_USER || '';
const esPass: string = process.env.ELASTICSEARCH_PASSWORD || '';
export const confLogger = {
  options: {
    hosts: esHost && esHost.split(','),
    // Might be auth instead, not sure.
    httpAuth: `${esUser}:${esPass}`,
  },
  indexPrefix: process.env.LOG_INDEX || 'kdrive',
};

export const debugMode: boolean = process.env.DEBUG_MODE === 'true';

// Router
export const port : string = process.env.PORT || '3000';
