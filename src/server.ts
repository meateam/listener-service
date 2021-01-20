import * as grpc from 'grpc';
import config from './config';
import {
  GrpcHealthCheck,
  HealthCheckResponse,
  HealthService,
  HealthCheckRequest,
  HealthClient } from 'grpc-ts-health-check';
import { log, Severity } from './utils/logger';

const address: string = `${config.service.host}:${config.service.port}`;
const serviceName: string = config.service.name;
export const healthCheckStatusMap: any = {
  [serviceName]: HealthCheckResponse.ServingStatus.UNKNOWN
};

/**
 * Definition of rpc server
 * @property  {Server}               instance - singelton server
 * @property  {grpc.Server}          server   - grpc server
 * @property  {HealthCheckRequest}   request  - health request
 */
export default class Server {
  private static _instance: Server;
  private request: HealthCheckRequest;
  private healthClient: HealthClient;
  public server: grpc.Server;

  public constructor () {
    // Create the server
    this.server = new grpc.Server();

    // Register the health service
    const grpcHealthCheck = new GrpcHealthCheck(healthCheckStatusMap);
    this.server.addService(HealthService, grpcHealthCheck);

    // Bind and start the server
    this.server.bind(address, grpc.ServerCredentials.createInsecure());

    // Create the health client and set service request
    this.healthClient = new HealthClient(address, grpc.credentials.createInsecure());
    this.request = new HealthCheckRequest();
    this.request.setService(serviceName);

    // Starting the server
    this.server.start();
    log(Severity.INFO,
        `server listening on address: ${address} in
         ${config.service.debugMode ? 'DEBUG' : 'PROD'} environment
         on port ${config.service.port}`,
        'server bind');
  }

  public setHealthStatus(status: HealthCheckResponse.ServingStatus): void {
    const service: string = this.request.getService();
    healthCheckStatusMap[service] = status;

    this.healthClient.check(this.request, (error: Error | null, response: HealthCheckResponse) => {
      if (error) console.log('Health Check Failed', error);
    });
  }

  public static boostrap(): Server {
    if (!Server._instance) Server._instance = new Server();
    return Server._instance;
  }
}
