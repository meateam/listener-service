import config from '../config';

/**
 * Mongo object types
 */
export enum ObjectType {
    FILE = 'FILE',
    PERMISSION = 'PERMISSION',
    NONE = 'NONE',
}

export function concludeObjectType(type: string) {
  switch (type) {
    case config.collections.file:
      return ObjectType.FILE;
    case config.collections.premission:
      return ObjectType.PERMISSION;
    default:
      return ObjectType.NONE;
  }
}

/**
 *  Operations types
 */
export enum OperationType {
    CREATE = 'CREATE',
    UPDATE = 'UPDATE',
    DELETE = 'DELETE',
    CHANGE = 'CHANGE',
    REPLACE = 'REPLACE',
    PERMISSIONS_CHANGE = 'PERMISSION_CHANGE',
    METADATA_CHANGE = 'METADATA_CHANGE',
    CONTENT_CHANGE = 'CONTENT_CHANGE',
    SHARE_CREATED = 'SHARE_CREATED',
    NONE = 'NONE',
  }

export function concludeMongoOperation(type: string) {
  switch (type) {
    case 'insert':
      return OperationType.CREATE;
    case 'update':
      return OperationType.UPDATE;
    case 'replace':
      return OperationType.REPLACE;
    case 'delete':
      return OperationType.DELETE;
    default:
      return OperationType.NONE;
  }
}
