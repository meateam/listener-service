import watchAndNotify, { getMongoHealthStatus, getRabbitHealthStatus } from '../mongo-rabbit/src/index';
import { MongoDataType, MTROptions, RabbitDataType } from '../mongo-rabbit/src/paramTypes';
import config, { collectionProducers } from '../config';
import { Severity, log } from '../utils/logger';

export function getRabbitHealth(): boolean {
  const status: boolean = getRabbitHealthStatus();
  if (!status) log(Severity.ERROR, 'rabbit health status false', 'rabbit-health');
  return status;
}

export function getMongoHealth(): boolean {
  const status: boolean = getMongoHealthStatus();
  if (!status) log(Severity.ERROR, 'mongo health status false', 'mongo-health');
  return status;
}
/**
 * initWatchAndNotify initiates the mongo watchers and rabbit queues,
 * using the mongo-to-rabbit (mtr) package.
 * The queues are taken from the colToQueueArray in the config file.
 */
export async function initWatchAndNotify() : Promise<void> {
  for (const collectionProducer of Object.values(collectionProducers)) {

    const mongoData: MongoDataType = {
      collectionName: collectionProducer.collection,
      connectionString: config.mongo.uri,
    };

    const rabbitData: RabbitDataType = {
      rabbitURI: config.rabbit.url,
      queues: collectionProducer.queues
    };

    const options: Partial<MTROptions> = {
      silent: false,
      retries: 10
    };

    try {
      await watchAndNotify(mongoData, rabbitData, options);
    } catch (err) {
      log(Severity.ERROR, `error while connecting to MTR for collection: ${JSON.stringify(collectionProducer)} : ${err}`, 'mtr.watchAndNotify');
      return;
    }
  }
}
