import { concludeMongoOperation, concludeObjectType } from '../../collectionProducer/collectionProducer.enum';
import { DataObjectType } from '../../mongo-rabbit/src/paramTypes';
import { DefaultResponse } from '../collectionResponse.interface';

export default function defaultParser(data: DataObjectType, collection: string) : DefaultResponse {
  const formattedData: DefaultResponse = new DefaultResponse(
    { data,
      objectType: concludeObjectType(collection),
      operationType: concludeMongoOperation(data.operation),
    });

  return formattedData;
}
