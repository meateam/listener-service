/**
 * Object types
 */
export enum ObjectType {
    FILE = 'FILE',
    PERMISSION = 'PERMISSION',
    NONE = 'NONE',
  }

export function concludeObjectType(type: string) {
  switch (type) {
    case 'files':
      return ObjectType.FILE;
    case 'permissions':
      return ObjectType.PERMISSION;
    default:
      return ObjectType.NONE;
  }
}

/**
 * Mongo operations types
 */
export enum OperationType {
  ADD = 'ADD',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  NONE = 'NONE',
}

export function concludeOperation(type: string) {
  switch (type) {
    case 'insert':
      return OperationType.ADD;
    case 'update':
      return OperationType.UPDATE;
    case 'delete':
      return OperationType.DELETE;
    default:
      return OperationType.NONE;
  }
}
