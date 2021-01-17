import { ObjectType, OperationType } from '../mongo/mongo.interface';

/**
 * Push object data to exchange
 */
export interface IPushObjectType {
  objectID: string;
  objectType: ObjectType;
  operationType: OperationType;
}

export class PushedObjectType implements IPushObjectType {
  objectID: string;
  objectType: ObjectType;
  operationType: OperationType;

  constructor(pushObjectReq: IPushObjectType) {
    this.objectID = pushObjectReq.objectID,
    this.objectType = pushObjectReq.objectType;
    this.operationType = pushObjectReq.operationType;
  }
}

export class CollectionProducer {
  collectionName: string;
  queueName: string;

  constructor(name: string, queue: string) {
    this.collectionName = name;
    this.queueName = queue;
  }
}
