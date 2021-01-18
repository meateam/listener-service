import { Dictionary } from '../utils/types';
import { ObjectType, OperationType } from '../collectionProducer/collectionProducer.enum';

/**
 * Default response
 */
export interface IDefaultResponse {
  objectType: ObjectType;
  operationType: OperationType;
  data?: any;
}

export class DefaultResponse implements IDefaultResponse {
  objectType: ObjectType;
  operationType: OperationType;
  data?: any;

  constructor(pushObject: IDefaultResponse) {
    this.objectType = pushObject.objectType;
    this.operationType = pushObject.operationType;
    if (pushObject.data) this.data = pushObject.data;
  }
}

/**
 * FileID response
 */
export interface IFileResponse {
  pushObjectReq: IDefaultResponse;
  fileID: string;
}

export class FileResponse extends DefaultResponse {
  fileID: string;

  constructor(filePushObject: IFileResponse) {
    super(filePushObject.pushObjectReq);
    this.fileID = filePushObject.fileID;
  }
}
