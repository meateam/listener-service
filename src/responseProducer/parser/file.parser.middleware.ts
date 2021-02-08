import { DataObjectType } from '../../mongo-rabbit/src/paramTypes';
import { log, Severity } from '../../utils/logger';
import { concludeMongoOperation, OperationType } from '../../collectionProducer/collectionProducer.enum';
import { FileResponse } from '../responseProducer.interface';

// TODO: add document structure

/**
 * fileIndexParser - file formatted msg
 * @param data  - data object type (from mongo change)
 * @returns FileResponse - file formatted msg
 */
export function fileIndexParser(data: DataObjectType): FileResponse | undefined {
  log(Severity.INFO, 'got data fileIndexParser:', 'fileIndexParser', undefined, data);
  let operation: OperationType = concludeMongoOperation(data.operation);

  if (operation === OperationType.UPDATE) {
    operation = OperationType.METADATA_CHANGE;
    if ('size' in data.updateDescription.updatedFields) return;
  }

  const formattedData: FileResponse = new FileResponse({
    pushObjectReq: { event: operation }, fileId: data.id
  });

  return formattedData;
}
