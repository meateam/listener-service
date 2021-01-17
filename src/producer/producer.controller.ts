import watchAndNotify from 'mongo-to-rabbit';
import generateParser from '../utils/middleware';
import config, { colToQueueArray } from '../config';
import { MongoDataType, RabbitDataType } from 'mongo-to-rabbit/lib/paramTypes';
import { log, Severity } from '../utils/logger';

/**
 * initWatchAndNotify initiates the mongo watchers and rabbit queues,
 * using the mongo-to-rabbit (mtr) package.
 * The queues are taken from the colToQueueArray in the config file.
 */
export async function initWatchAndNotify() : Promise<void> {
  for (const colQCouple of colToQueueArray) {

    const mongoData: MongoDataType = {
      collectionName: colQCouple.collection,
      connectionString: config.mongo.uri,
    };

    const rabbitData: RabbitDataType = {
      rabbitURI: config.rabbit.url,
      queueName: colQCouple.queue
    };

    try {
      await watchAndNotify(mongoData, rabbitData, { silent: false, middleware: generateParser(mongoData.collectionName) });
    } catch (err) {
      log(Severity.ERROR, `error while connecting to MTR for colQCouple: ${JSON.stringify(colQCouple)} : ${err}`, 'mtr.watchAndNotify');
      return;
    }
  }
}
