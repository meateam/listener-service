import { ObjectType, RabbitMsgType } from '../collection.enum';

/**
 * Default response interface
 */
export interface IDefaultResponse {
  event: RabbitMsgType;
  object?: ObjectType;
  data?: any;
}

export default class DefaultResponse implements IDefaultResponse {
  event: RabbitMsgType;
  data?: any;

  constructor(pushObject: IDefaultResponse) {
    this.event = pushObject.event;
    if (pushObject.data) this.data = pushObject.data;
  }
}
