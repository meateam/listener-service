import config from "../config";
import { QueueObjectType } from "mongo-to-rabbit/src/paramTypes";
import { CollectionProducer } from "../producer/producer.collection";
import { fileIndexParser } from "./file/file.parser";
import { permissionHiParser, permissionIndexParser } from "./permission/permission.parser";

// Index queue form indexing in elastic for advanced search
export const indexqueue: QueueObjectType = {
  name: config.queues.IndexQueue.name,
  exchange: {
    name: config.queues.IndexQueue.exchange,
    type: "topic",
    routingKey: config.queues.IndexQueue.routingKey,
  },
};

export const collectionProducers = {
  file: new CollectionProducer({
    collection: config.collections.file,
    queues: [Object.assign({}, indexqueue, { middleware: fileIndexParser })],
  }),
  permission: new CollectionProducer({
    collection: config.collections.premission,
    queues: [
      Object.assign({}, indexqueue, { middleware: permissionIndexParser }),
      { name: config.queues.hiQueue, middleware: permissionHiParser },
    ],
  }),
};
