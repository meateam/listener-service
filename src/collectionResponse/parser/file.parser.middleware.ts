import { concludeObjectType, concludeOperation, OperationType } from '../../collectionProducer/collectionProducer.enum';
import { DataObjectType } from '../../mongo-rabbit/src/paramTypes';
import { FileResponse } from '../collectionResponse.interface';

// TODO: add document structure

export function fileIndexParser(data: DataObjectType, collection: string): FileResponse | FileResponse[] {
  const operation = concludeOperation(data.operation);

  if (operation === OperationType.UPDATE) {
    let responses: FileResponse[] = [];
    const operations: OperationType[] = [OperationType.METADATA_CHANGE];
    if ('size' in data.updateDescription.updatedFields) operations.push(OperationType.CONTENT_CHANGE);

    responses = operations.map(oper => new FileResponse({
      pushObjectReq: {
        objectType:   concludeObjectType(collection),
        operationType: oper
      },
      fileID: data.id
    }));

    return responses;
  }

  const formattedData: FileResponse = new FileResponse({
    pushObjectReq: {
      objectType:   concludeObjectType(collection),
      operationType: operation
    },
    fileID: data.id
  });

  return formattedData;
}
