import express from 'express';
import config from './config';
import { log, Severity } from './utils/logger';
import { router } from './router';

/**
 * Definition of express server
 */
export class Server {
  public app: express.Application;

  private constructor () {
    this.app = express();

    this.app.use(router);
  }

  public static bootstrap(): Server {
    return new Server();
  }

  public listen() {
    this.app.listen(config.service.port, () => {
      log(Severity.INFO,  `Server running in ${config.service.debugMode ? 'DEBUG' : 'PROD'} environment on port ${config.service.port}`, 'initApp');
    });
  }
}
