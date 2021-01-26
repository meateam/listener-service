import { concludeMongoOperation, concludeObjectType } from '../../collectionProducer/collectionProducer.enum';
import { DataObjectType } from '../../mongo-rabbit/src/paramTypes';
import { DefaultResponse } from '../responseProducer.interface';

export default function defaultParser(data: DataObjectType, collection?: string) : DefaultResponse {
  const formattedData: DefaultResponse = new DefaultResponse(
    { data,
      object: (collection) ? concludeObjectType(collection) : undefined,
      event: concludeMongoOperation(data.operation),
    });

  return formattedData;
}
