import * as grpc from "grpc";
import config from "./config";
import ProducerMethods from "./producer/producer.grpc";
import * as protoLoader from "@grpc/proto-loader";
import {
  GrpcHealthCheck,
  HealthCheckResponse,
  HealthService,
  HealthCheckRequest,
  HealthClient,
} from "grpc-ts-health-check";
import { log, Severity } from "./utils/logger";
import { wrapper } from "./utils/wrapper";

/**
 ******* PROTO LOADER *******
 */
const PRODUCER_PROTO_PATH: string = `${__dirname}/../proto/producer/producer.proto`;

// Suggested options for similarity to existing grpc.load behavior
const producerPackageDefinition: protoLoader.PackageDefinition = protoLoader.loadSync(PRODUCER_PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

// Has the full package hierarchy
const producerProtoDescriptor: grpc.GrpcObject = grpc.loadPackageDefinition(producerPackageDefinition);
const producer_proto: any = producerProtoDescriptor.producer;

/**
 ******* SERVICE CONFIGURATION *******
 */
const address: string = `${config.service.host}:${config.service.port}`;
const serviceName: string = config.service.name;
export const healthCheckStatusMap: any = {
  "": HealthCheckResponse.ServingStatus.UNKNOWN,
  [serviceName]: HealthCheckResponse.ServingStatus.UNKNOWN,
};

/**
 * Definition of rpc server
 * @property  {Server}               instance - singelton server
 * @property  {grpc.Server}          server   - grpc server
 * @property  {HealthCheckRequest}   request  - health request
 */
export default class Server {
  private static _instance: Server;
  private requests: HealthCheckRequest[];
  private healthClient: HealthClient;
  public server: grpc.Server;

  public constructor() {
    // Create the server
    this.server = new grpc.Server();
    this.requests = [];

    // Register the health service
    const grpcHealthCheck = new GrpcHealthCheck(healthCheckStatusMap);
    this.server.addService(HealthService, grpcHealthCheck);

    // Bind and start the server
    this.server.bind(address, grpc.ServerCredentials.createInsecure());

    // Create the health client and set service request
    this.healthClient = new HealthClient(address, grpc.credentials.createInsecure());

    for (const healthCheck in healthCheckStatusMap) {
      const request = new HealthCheckRequest();
      request.setService(healthCheck);
      this.requests.push(request);
    }

    this.addServices();

    // Starting the server
    this.server.start();
    log(
      Severity.INFO,
      `server listening on address: ${address} in ${config.service.debugMode ? "DEBUG" : "PROD"} environment on port ${
        config.service.port
      }`,
      "server bind"
    );
  }

  private addServices() {
    const producerService = {
      SendMsg: wrapper(ProducerMethods.sendMsg),
      SendPermissionDelete: wrapper(ProducerMethods.sendPermissionDelete),
      SendContentChange: wrapper(ProducerMethods.sendContentChange),
    };

    this.server.addService(producer_proto.ProducerService.service, producerService);
  }

  public setHealthStatus(status: HealthCheckResponse.ServingStatus): void {
    this.requests.forEach((request) => {
      const service: string = request.getService();
      healthCheckStatusMap[service] = status;

      this.healthClient.check(request, (error: Error | null, response: HealthCheckResponse) => {
        if (error) console.log("Health Check Failed", error);
      });
    });
  }

  public static boostrap(): Server {
    if (!Server._instance) Server._instance = new Server();
    return Server._instance;
  }
}
