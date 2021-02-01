import { indexqueue } from '../config';
import { OperationType } from '../collectionProducer/collectionProducer.enum';
import { sendMsg} from '../mongo-rabbit/src';
import { QueueObjectType, ExchangeObjectType } from '../mongo-rabbit/src/paramTypes';

export default class ProducerMethods {
  public static async sendMsg(call: any): Promise<void> {
    const msg: string = call.request.msg;
    const queue: string = call.request.queue;
    const exchange: ExchangeObjectType = call.request.exchange;

    const queueDest: QueueObjectType = { exchange, name: queue };
    sendMsg(queueDest, msg);
  }

  public static async sendPermissionDelete(call: any): Promise<void> {
    const fileID: string = call.request.fileID;
    const data = { fileID, event: OperationType.PERMISSIONS_CHANGE };
    sendMsg(indexqueue, data);
  }

  public static async sendContentChange(call: any): Promise<void> {
    const fileID: string = call.request.fileID;
    const data = { fileID, event: OperationType.CONTENT_CHANGE };
    sendMsg(indexqueue, data);
  }
}
