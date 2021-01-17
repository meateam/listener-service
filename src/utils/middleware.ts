import { DataObjectType } from 'mongo-to-rabbit/lib/paramTypes';
import { concludeOperation, concludeObjectType } from '../mongo/mongo.interface';
import { PushedObjectType } from '../producer/producer.interface';

export default function generateParser(collection: string) : (data: DataObjectType) => PushedObjectType {
  return (data: DataObjectType) => {
    const formattedData: PushedObjectType = new PushedObjectType({
      objectID: data.id,
      objectType: concludeObjectType(collection),
      operationType: concludeOperation(data.operation)
    });

    console.log('!!!!!!!!!!! DATA!!!!!!!!!!!!');
    console.log(data);

    console.log('formatted data: ');

    console.log(formattedData);

    return formattedData;
  };
}
