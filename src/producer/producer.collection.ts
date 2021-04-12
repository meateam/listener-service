import { QueueObjectType } from 'mongo-to-rabbit/src/paramTypes';

/**
 * ICollectionProducer - collection producer interface
 */
export interface ICollectionProducer {
  collection: string;
  queues: QueueObjectType[];
}

/**
 * CollectionProducer
 */
export class CollectionProducer implements ICollectionProducer {
  collection: string;
  queues: QueueObjectType[];

  constructor(collectionProducer: ICollectionProducer) {
    this.collection = collectionProducer.collection;
    this.queues = collectionProducer.queues;
  }
}
