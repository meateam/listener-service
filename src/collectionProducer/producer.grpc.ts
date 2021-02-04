import { sendMsg } from '../mongo-rabbit/src';
import { QueueObjectType, ExchangeObjectType } from '../mongo-rabbit/src/paramTypes';
import { indexqueue } from '../config';
import { OperationType } from '../collectionProducer/collectionProducer.enum';
import { FileResponse } from '../responseProducer/responseProducer.interface';

/**
 * Producer grpc service methods
 */
export default class ProducerMethods {
  /**
   * sendMsg - send msg to every queue
   * @param {SendMsgRequest} call
   */
  public static async sendMsg(call: any): Promise<void> {
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
  public static async sendPermissionDelete(call: any): Promise<void> {
    const fileId: string = call.request.fileID;
    const data: FileResponse = { fileId, event: OperationType.PERMISSIONS_CHANGE };

    sendMsg(indexqueue, data);
  }

  /**
   * sendContentChange - send msg index queue about content change
   * @param {SendContentChangeRequest} call
   */
  public static async sendContentChange(call: any): Promise<void> {
    const fileId: string = call.request.fileID;
    const data: FileResponse = { fileId, event: OperationType.CONTENT_CHANGE };
    sendMsg(indexqueue, data);
  }
}
