import express from 'express';
import config from './config';
import { log, Severity } from './utils/logger';
import { router } from './router';

/**
 * Definition of express server
 */
export class Server {
  private static instance: Server;
  public app: express.Application;

  private constructor () {
    this.app = express();
    this.app.use(router);
  }

  public static boostrap(): Server {
    if (!Server.instance) Server.instance = new Server();
    Server.instance.listen();

    return Server.instance;
  }

  private listen() {
    this.app.listen(config.service.port, () => {
      log(Severity.INFO,  `Server running in ${config.service.debugMode ? 'DEBUG' : 'PROD'} environment on port ${config.service.port}`, 'initApp');
    });
  }
}
