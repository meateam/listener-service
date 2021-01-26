import { indexqueue } from '../config';
import { OperationType } from '../collectionProducer/collectionProducer.enum';
import { sendMsg } from '../mongo-rabbit/src';
import { queueObjectType, exchangeObjectType } from '../mongo-rabbit/src/paramTypes';

export default class ProducerService {
  public static async sendMsg(
        msg: string,
        queue: string,
        exchange: exchangeObjectType
    ): Promise<void> {
    const queueDest: queueObjectType = { exchange, name: queue };
    sendMsg(queueDest, msg);
  }

  public static async sendPermissionDelete(fileID: string): Promise<void> {
    const data = { fileID, event: OperationType.PERMISSIONS_CHANGE };
    sendMsg(indexqueue, data);
  }

  public static async sendContentChange(fileID: string): Promise<void> {
    const data = { fileID, event: OperationType.CONTENT_CHANGE };
    sendMsg(indexqueue, data);
  }
}
