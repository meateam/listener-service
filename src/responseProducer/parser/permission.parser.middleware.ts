import { concludeMongoOperation, OperationType } from '../../collectionProducer/collectionProducer.enum';
import { DataObjectType } from '../../mongo-rabbit/src/paramTypes';
import { DefaultResponse, FileResponse } from '../responseProducer.interface';

// TODO: another definition & add error when castiong goes wrong
export interface PermissionDoc {
  _id: string;
  fileID: string;
  userID: string;
  appID: string;
  creator: string;
  role: number;
  created_at: string;
  updated_at: string;
}

export function permissionIndexParser(data: DataObjectType): FileResponse | undefined {
  if (concludeMongoOperation(data.operation) !== OperationType.DELETE) {
    const permissionDoc: PermissionDoc = <PermissionDoc>data.fullDocument;
    const formattedData: FileResponse = new FileResponse({
      pushObjectReq: { event: OperationType.PERMISSIONS_CHANGE },
      fileID: permissionDoc.fileID
    });

    return formattedData;
  }

  return;
}

export function permissionHiParser(data: DataObjectType): DefaultResponse | undefined {
  const permissionDoc: PermissionDoc = <PermissionDoc>data.fullDocument;
  let operation: OperationType = concludeMongoOperation(data.operation);
  if (operation === OperationType.CREATE &&
    permissionDoc.creator !== permissionDoc.userID) {
    operation = OperationType.SHARE_CREATED;

    const formattedData: DefaultResponse = new DefaultResponse({
      event: operation,
      data: permissionDoc,
    });

    return formattedData;
  }

  return;
}
