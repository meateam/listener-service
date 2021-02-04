import { ObjectType, OperationType } from '../collectionProducer/collectionProducer.enum';

/**
 * Default response interface
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
 * FileID response interface
 */
export interface IFileResponse {
  pushObjectReq: IDefaultResponse;
  fileId: string;
}

export class FileResponse extends DefaultResponse {
  fileId: string;

  constructor(filePushObject: IFileResponse) {
    super(filePushObject.pushObjectReq);
    this.fileId = filePushObject.fileId;
  }
}
