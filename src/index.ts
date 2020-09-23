import express from 'express';
import * as http from 'http';
import watchAndNotify from 'mongo-to-rabbit';
import { MongoDataType, RabbitDataType } from 'mongo-to-rabbit/lib/paramTypes';
import { colToQueueArray, mongoConnectionString, rabbitURI, port } from './config';
import { log, Severity } from './utils/logger';
import { router } from './router';
import generateParser from './utils/middleware';

function initApp() {
  const app : express.Application = express();
  app.use(router);
  app.set('port', port);
  http.createServer(app).listen(app.get('port'), () => {
    log(Severity.INFO, `Express server listening on port ${app.get('port')}`, 'initApp');
  });
}

/**
 * initWatchAndNotify initiates the mongo watchers and rabbit queues,
 * using the mongo-to-rabbit (mtr) package.
 * The queues are taken from the colToQueueArray in the config file.
 */
async function initWatchAndNotify() : Promise<void> {
  for (const colQCouple of colToQueueArray) {

    const mongoData: MongoDataType = {
      collectionName: colQCouple.collection,
      connectionString: mongoConnectionString,
    };

    const rabbitData: RabbitDataType = {
      rabbitURI,
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

async function init() : Promise<void> {
  // initiate express app with router
  initApp();

  // initiate watchAndNotify for each colQCouple.
  await initWatchAndNotify();
}

// run listener-service
init();
