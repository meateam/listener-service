import { concludeMongoOperation, OperationType } from '../../collectionProducer/collectionProducer.enum';
import { DataObjectType } from '../../mongo-rabbit/src/paramTypes';
import { FileResponse } from '../responseProducer.interface';

// TODO: add document structure

/**
 * fileIndexParser - file formatted msg
 * @param data  - data object type (from mongo change)
 * @returns FileResponse - file formatted msg
 */
export function fileIndexParser(data: DataObjectType): FileResponse | undefined {
  const operation = concludeMongoOperation(data.operation);

  if (operation === OperationType.UPDATE &&
      'updatedAt' in data.updateDescription.updatedFields) {
    return;
  }

  const formattedData: FileResponse = new FileResponse({
    pushObjectReq: { event: operation }, fileId: data.id
  });

  return formattedData;
}
