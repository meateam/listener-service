import config from '../config';
import { queueType } from '../mongo-rabbit/src/paramTypes';

/**
 * ICollectionProducer - collection producer interface
 */
export interface ICollectionProducer {
  collection: string;
  queues: queueType[];
  rabbitmqUrl?: string;
}

/**
 * CollectionProducer
 */
export class CollectionProducer implements ICollectionProducer{
  collection: string;
  queues: queueType[];
  rabbitmqUrl: string;

  constructor(collectionProducer: ICollectionProducer) {
    this.collection = collectionProducer.collection;
    this.queues = collectionProducer.queues;
    this.rabbitmqUrl = collectionProducer.rabbitmqUrl ?
                        collectionProducer.rabbitmqUrl : config.rabbit.url;
  }
}
