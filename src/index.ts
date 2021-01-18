import apm from 'elastic-apm-node';
import config from './config';
import { initWatchAndNotify } from './collectionProducer/collectionProducer.service';
import { Server } from './server';
import { log, Severity } from './utils/logger';

(async () => {
  apm.start({
    serviceName: config.service.name,
    secretToken: config.apmConfig.secretToken,
    verifyServerCert: config.apmConfig.verifyServerCert,
    serverUrl: config.apmConfig.apmURL,
  });

  // initiate watchAndNotify for each colQCouple.
  await initWatchAndNotify();

  // initiate express app with router
  const server: Server = Server.boostrap();

  server.app.on('close', () => {
    log(Severity.INFO, 'Server closed', 'Server');
  });
})();
