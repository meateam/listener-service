import DefaultResponse from './default.response';
import { DataObjectType } from 'mongo-to-rabbit/src/paramTypes';
import { concludeMongoOperation, concludeObjectType } from '../collection.enum';
import { log, Severity } from "../../utils/logger";

/**
 * defaultParser - take an event from mongo and parse it to rabbit msg queue
 * @param   data       - data object type (from mongo change)
 * @param   collection - collection name
 * @returns { DefaultResponse } - default formatted msg
 */
export default function defaultParser(data: DataObjectType, collection?: string): DefaultResponse {
  log(Severity.INFO, "got data at defaultParser", "defaultParser", undefined, data);

  const formattedData: DefaultResponse = new DefaultResponse({
    data,
    object: collection ? concludeObjectType(collection) : undefined,
    event: concludeMongoOperation(data.operation),
  });

  return formattedData;
}
