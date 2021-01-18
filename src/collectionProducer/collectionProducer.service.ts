import watchAndNotify from '../mongo-rabbit/src/index';
import { MongoDataType, RabbitDataType } from '../mongo-rabbit/src/paramTypes';
import { Severity, log } from '../utils/logger';
import config, { collectionProducers } from '../config';

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
      rabbitURI: collectionProducer.rabbitmqUrl,
      queues: collectionProducer.queues
    };

    try {
      await watchAndNotify(mongoData, rabbitData, { silent: false });
    } catch (err) {
      log(Severity.ERROR, `error while connecting to MTR for colQCouple: ${JSON.stringify(collectionProducer)} : ${err}`, 'mtr.watchAndNotify');
      return;
    }
  }
}
