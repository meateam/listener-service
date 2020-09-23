import { DataObjectType } from 'mongo-to-rabbit/lib/paramTypes';

class PushedObjectType {
    objectID: string;
    objectType: ObjectType;
    operation: Operation;

    constructor() {
        this.objectID = '',
        this.objectType = ObjectType.NONE;
        this.operation = Operation.NONE;
    }
}

enum Operation {
    ADD = 'ADD',
    UPDATE = 'UPDATE',
    DELETE = 'DELETE',
    NONE = 'NONE',
}

enum ObjectType {
    FILE = 'FILE',
    PERMISSION = 'PERMISSION',
    NONE = 'NONE',
}

function concludeObjectType(type: string) {
    switch(type) {
        case 'file':
            return ObjectType.FILE;
        case 'permission':
            return ObjectType.PERMISSION;
        default:
            return ObjectType.NONE;
    }
}

function concludeOperation(type: string) {
    switch(type) {
        case 'insert':
            return Operation.ADD;
        case 'update':
            return Operation.UPDATE;
        case 'delete':
            return Operation.DELETE;
        default:
            return Operation.NONE;
    }
}

export default function generateParser(collection: string) : (data: DataObjectType) => PushedObjectType {
    return (data: DataObjectType) => {
        let formattedData: PushedObjectType = new PushedObjectType();
        formattedData.objectID = data.id;
        formattedData.objectType = concludeObjectType(collection);
        formattedData.operation = concludeOperation(data.operation);

        return formattedData;
    }
}
