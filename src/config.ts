export const mongoConnectionString: string = process.env.MONGO_HOST || 'mongodb://localhost:27017/devDB';
export const rabbitURI: string = process.env.RABBIT_HOST || 'amqp://localhosta';

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
