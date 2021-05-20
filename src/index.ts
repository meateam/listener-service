import apm from "elastic-apm-node";
import config from "./config";
import ListenerServer from "./server";
import { HealthCheckResponse } from "grpc-ts-health-check";
import { getMongoHealth, getRabbitHealth, initWatchAndNotify } from "./producer/producer.service";

(async () => {
  // Initiate watchAndNotify for each producer.
  await initWatchAndNotify();

  // Initiate grpc server
  const listenerServer: ListenerServer = ListenerServer.boostrap();

  // Check health interval (of rabbit and mongo)
  setInterval(() => {
    getRabbitHealth() && getMongoHealth()
      ? listenerServer.setHealthStatus(HealthCheckResponse.ServingStatus.SERVING)
      : listenerServer.setHealthStatus(HealthCheckResponse.ServingStatus.NOT_SERVING);
  }, config.checkHealthInterval);
})();
