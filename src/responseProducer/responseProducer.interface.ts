import { ObjectType, OperationType } from '../collectionProducer/collectionProducer.enum';

/**
 * Default response
 */
export interface IDefaultResponse {
  event: OperationType;
  object?: ObjectType;
  data?: any;
}

export class DefaultResponse implements IDefaultResponse {
  event: OperationType;
  data?: any;

  constructor(pushObject: IDefaultResponse) {
    this.event = pushObject.event;
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
