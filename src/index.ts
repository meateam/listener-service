import apm from 'elastic-apm-node';
import { HealthCheckResponse } from 'grpc-ts-health-check';
import config from './config';
import ListenerServer from './server';
import { getMongoHealth,
         getRabbitHealth, 
         initWatchAndNotify } from './collectionProducer/collectionProducer.service';

(async () => {
  apm.start({
    serviceName: config.service.name,
    secretToken: config.apmConfig.secretToken,
    verifyServerCert: config.apmConfig.verifyServerCert,
    serverUrl: config.apmConfig.apmURL,
  });

  // Initiate watchAndNotify for each producer.
  await initWatchAndNotify();

  // Initiate grpc server
  const listenerServer: ListenerServer = ListenerServer.boostrap();

  // Check health interval (of rabbit and mongo)
  setInterval(() => {
    getRabbitHealth() && getMongoHealth() ?
    listenerServer.setHealthStatus(HealthCheckResponse.ServingStatus.SERVING) :
    listenerServer.setHealthStatus(HealthCheckResponse.ServingStatus.NOT_SERVING);
  },          10000);
})();
