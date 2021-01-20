import { concludeObjectType, concludeMongoOperation, OperationType } from '../../collectionProducer/collectionProducer.enum';
import { DataObjectType } from '../../mongo-rabbit/src/paramTypes';
import { DefaultResponse, FileResponse } from '../collectionResponse.interface';

// TODO: another definition & add error when castiong goes wrong
export interface PermissionDoc {
  _id: string;
  fileID: string;
  userID: string;
  appID: string;
  creator: string;
  role: number;
}


export function permissionIndexParser(data: DataObjectType, collection: string): FileResponse {
  const permissionDoc: PermissionDoc = <PermissionDoc>data.fullDocument;
  const formattedData: FileResponse = new FileResponse({
    pushObjectReq: {
      objectType:   concludeObjectType(collection),
      operationType: OperationType.CHANGE,
    },
    fileID: permissionDoc.fileID
  });

  return formattedData;
}

export function permissionHiParser(data: DataObjectType, collection: string): DefaultResponse | undefined {
  const permissionDoc: PermissionDoc = <PermissionDoc>data.fullDocument;
  let operation: OperationType = concludeMongoOperation(data.operation);
  if (operation === OperationType.CREATE &&
    permissionDoc.creator !== permissionDoc.userID) {
    operation = OperationType.SHARE_CREATED;

    const formattedData: DefaultResponse = new DefaultResponse({
      objectType:   concludeObjectType(collection),
      operationType: operation,
      data: permissionDoc,
    });

    return formattedData;
  }

  return;
}
