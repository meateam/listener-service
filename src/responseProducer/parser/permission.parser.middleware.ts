import { DataObjectType } from '../../mongo-rabbit/src/paramTypes';
import { concludeMongoOperation, OperationType } from '../../collectionProducer/collectionProducer.enum';
import { PermissionObject } from '../../../proto/permission/generated/permission_pb';
import { DefaultResponse, FileResponse } from '../responseProducer.interface';

/**
 * permissionIndexParser - permission msg parser for index queue
 * @param data  - data object type (from mongo change)
 * @returns FileResponse|undefiend - file formatted msg
 */
export function permissionIndexParser(data: DataObjectType): FileResponse | undefined {
  console.log('got data at permissionIndexParser', data);

  if (concludeMongoOperation(data.operation) !== OperationType.DELETE) {

    const permissionDoc: PermissionObject = <PermissionObject>data.fullDocument;
    const formattedData: FileResponse = new FileResponse({
      pushObjectReq: { event: OperationType.PERMISSIONS_CHANGE },
      fileId: permissionDoc.getFileid()
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
  let operation: OperationType = concludeMongoOperation(data.operation);

  // If the creator isn't as the dest user - it is a new share permission
  if (operation === OperationType.CREATE &&
      permissionDoc.getCreator() !== permissionDoc.getUserid()) {
    operation = OperationType.SHARE_CREATED;

    const formattedData: DefaultResponse = new DefaultResponse({
      event: operation,
      data: permissionDoc,
    });

    return formattedData;
  }

  return;
}
