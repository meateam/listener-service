import * as mtr from 'mongo-to-rabbit';
import express from 'express';
import * as http from 'http';
import { router } from './router';
import { colToQueueArray, mongoConnectionString, rabbitURI, port } from './config';
import { MongoDataType, RabbitDataType } from 'mongo-to-rabbit/lib/paramTypes';
import { log, Severity } from './logger';

function initApp() {
  const app : express.Application = express();
  app.use(router);
  app.set('port', port);
  http.createServer(app).listen(app.get('port'), () => {
    log(Severity.INFO, `Express server listening on port ${app.get('port')}`, 'initApp');
  });
}

async function initWatchAndNotify() : Promise<void> {
  for (const colQCouple of colToQueueArray) {

    const mongoData: MongoDataType = {
      collectionName: colQCouple.collection,
      connectionString: mongoConnectionString,
      prettify: false
    };

    const rabbitData: RabbitDataType = {
      rabbitURI,
      queueName: colQCouple.queue
    };

    try {
      await mtr.watchAndNotify(mongoData, rabbitData);
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
