import DefaultResponse, { IDefaultResponse } from '../default/default.response';

/**
 * File Collection response interface
 */
export interface IFileResponse {
  pushObjectReq: IDefaultResponse;
  fileId: string;
}

export default class FileResponse extends DefaultResponse {
  fileId: string;

  constructor(filePushObject: IFileResponse) {
    super(filePushObject.pushObjectReq);
    this.fileId = filePushObject.fileId;
  }
}
