import DefaultResponse from '../default/default.response';
import FileResponse from '../file/file.response';
import { DataObjectType } from 'mongo-to-rabbit/src/paramTypes';
import { concludeMongoOperation, RabbitMsgType } from '../collection.enum';
import { PermissionObject } from '../../../proto/permission/generated/permission_pb';

/**
 * permissionIndexParser - permission msg parser for index queue
 * @param data  - data object type (from mongo change)
 * @returns FileResponse|undefiend - file formatted msg
 */
export function permissionIndexParser(data: DataObjectType): FileResponse | undefined {
  console.log('got data at permissionIndexParser', data);

  if (concludeMongoOperation(data.operation) !== RabbitMsgType.DELETE) {
    const permissionDoc: PermissionObject = <PermissionObject>data.fullDocument;
    const formattedData: FileResponse = new FileResponse({
      pushObjectReq: { event: RabbitMsgType.PERMISSIONS_CHANGE },
      fileId: permissionDoc.getFileid(),
    });

    return formattedData;
  }

  return;
}

/**
 * permissionHiParser - permission msg parser for hi queue
 * @param data  - data object type (from mongo change)
 * @returns DefaultResponse|undefiend - default formatted msg
 */
export function permissionHiParser(data: DataObjectType): DefaultResponse | undefined {
  console.log('got data at permissionHiParser', data);

  const permissionDoc: PermissionObject = <PermissionObject>data.fullDocument;
  const operation: RabbitMsgType = concludeMongoOperation(data.operation);

  // If the creator isn't as the dest user - it is a new share permission
  if (operation === RabbitMsgType.CREATE && permissionDoc.getCreator() !== permissionDoc.getUserid()) {
    const formattedData: DefaultResponse = new DefaultResponse({
      event: operation,
      data: permissionDoc,
    });

    return formattedData;
  }

  return;
}
