import FileResponse from '../collection/file/file.response';
import { sendMsg } from 'mongo-to-rabbit';
import { indexqueue } from '../collection/collection.object';
import { RabbitMsgType } from '../collection/collection.enum';
import { QueueObjectType, ExchangeObjectType } from 'mongo-to-rabbit/src/paramTypes';

/**
 * Producer grpc service methods
 */
export default class ProducerMethods {
  /**
   * sendMsg - send msg to every queue
   * @param {SendMsgRequest} call
   */
  public static sendMsg(call: any): void {
    const msg: string = call.request.msg;
    const queue: string = call.request.queue;
    const exchange: ExchangeObjectType = call.request.exchange;

    const queueDest: QueueObjectType = { exchange, name: queue };
    sendMsg(queueDest, msg);
  }

  /**
   * sendPermissionDelete - send msg index queue about permission deletion
   * @param {SendPermissionDeleteRequest} call
   */
  public static sendPermissionDelete(call: any): void {
    const fileId: string = call.request.fileID;
    const data: FileResponse = { fileId, event: RabbitMsgType.PERMISSIONS_CHANGE };

    sendMsg(indexqueue, data);
  }

  /**
   * sendContentChange - send msg index queue about content change
   * @param {SendContentChangeRequest} call
   */
  public static sendContentChange(call: any): void {
    const fileId: string = call.request.fileID;
    const data: FileResponse = { fileId, event: RabbitMsgType.CONTENT_CHANGE };
    sendMsg(indexqueue, data);
  }
}
