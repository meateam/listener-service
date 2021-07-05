import DefaultResponse from '../default/default.response';
import FileResponse from '../file/file.response';
import { DataObjectType } from 'mongo-to-rabbit/src/paramTypes';
import { concludeMongoOperation, RabbitMsgType } from '../collection.enum';
import { log, Severity } from '../../utils/logger';

/**
 * permissionIndexParser - permission msg parser for index queue
 * @param data  - data object type (from mongo change)
 * @returns FileResponse|undefiend - file formatted msg
 */
export function permissionIndexParser(data: DataObjectType): FileResponse | undefined {
  log(Severity.INFO, 'got data at permissionIndexParser', 'permissionIndexParser', undefined, data);

  if (concludeMongoOperation(data.operation) !== RabbitMsgType.DELETE) {
    const permissionDoc: any = data.fullDocument;

    if (permissionDoc.fileID) {
      const formattedData: FileResponse = new FileResponse({
        pushObjectReq: { event: RabbitMsgType.PERMISSIONS_CHANGE },
        fileId: permissionDoc.fileID,
      });

      return formattedData;
    }

    log(Severity.ERROR, 'permission document not valid', 'permissionIndexParser');
  }

  return;
}

/**
 * permissionHiParser - permission msg parser for hi queue
 * @param data  - data object type (from mongo change)
 * @returns DefaultResponse|undefiend - default formatted msg
 */
export function permissionHiParser(data: DataObjectType): DefaultResponse | undefined {
  log(Severity.INFO, 'got data at permissionHiParser', 'permissionHiParser', undefined, data);

  const permissionDoc: any = data.fullDocument;
  const operation: RabbitMsgType = concludeMongoOperation(data.operation);

  if (permissionDoc.creator && permissionDoc.userID) {
    // If the creator isn't the same as the dest user - it is a new share permission
    if (operation === RabbitMsgType.CREATE && permissionDoc.creator !== permissionDoc.userID) {
      const formattedData: DefaultResponse = new DefaultResponse({
        event: operation,
        data: permissionDoc,
      });

      return formattedData;
    }

    return;
  }

  log(Severity.ERROR, 'permission document not valid', 'permissionHiParser');
  return;
}
