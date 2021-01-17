import { Server } from './server';
import { log, Severity } from './utils/logger';
import { initWatchAndNotify } from './producer/producer.controller';

(async () => {
    // initiate express app with router
  const server: Server = Server.bootstrap();
  server.listen();

    // initiate watchAndNotify for each colQCouple.
  await initWatchAndNotify();

  server.app.on('close', () => {
    log(Severity.INFO, 'Server closed', 'Server');
  });
})();
