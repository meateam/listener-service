import { DataObjectType } from '../../mongo-rabbit/src/paramTypes';
import { concludeMongoOperation, concludeObjectType } from '../../collectionProducer/collectionProducer.enum';
import { log, Severity } from '../../utils/logger';
import { DefaultResponse } from '../responseProducer.interface';

/**
 * defaultParser
 * @param   data       - data object type (from mongo change)
 * @param   collection - collection name
 * @returns DefaultResponse - default formatted msg
 */
export default function defaultParser(data: DataObjectType, collection?: string) : DefaultResponse {
  log(Severity.INFO, 'got data:', 'defaultParser', undefined, data);

  const formattedData: DefaultResponse = new DefaultResponse(
    { data,
      object: (collection) ? concludeObjectType(collection) : undefined,
      event: concludeMongoOperation(data.operation),
    });

  return formattedData;
}
