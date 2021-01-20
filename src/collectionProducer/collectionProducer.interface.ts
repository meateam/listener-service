import { queueObjectType } from '../mongo-rabbit/src/paramTypes';

/**
 * ICollectionProducer - collection producer interface
 */
export interface ICollectionProducer {
  collection: string;
  queues: queueObjectType[];
}

/**
 * CollectionProducer
 */
export class CollectionProducer implements ICollectionProducer{
  collection: string;
  queues: queueObjectType[];

  constructor(collectionProducer: ICollectionProducer) {
    this.collection = collectionProducer.collection;
    this.queues = collectionProducer.queues;
  }
}
