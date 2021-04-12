import config from '../config';

/**
 * Mongo object types collections
 */
export enum ObjectType {
  FILE = 'FILE',
  PERMISSION = 'PERMISSION',
  NONE = 'NONE',
}

/**
 *  Get object type by mongo collection name
 */
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
 *  Rabbit msg types
 */
export enum RabbitMsgType {
  // Mongo operation
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  CHANGE = 'CHANGE',
  REPLACE = 'REPLACE',
  NONE = 'NONE',

  // Index queue custom operations
  PERMISSIONS_CHANGE = 'PERMISSION_CHANGE',
  METADATA_CHANGE = 'METADATA_CHANGE',
  CONTENT_CHANGE = 'CONTENT_CHANGE',

  // Hi queue custom operations
  SHARE_CREATED = 'SHARE_CREATED',
}

export function concludeMongoOperation(type: string) {
  switch (type) {
    case 'insert':
      return RabbitMsgType.CREATE;
    case 'update':
      return RabbitMsgType.UPDATE;
    case 'replace':
      return RabbitMsgType.REPLACE;
    case 'delete':
      return RabbitMsgType.DELETE;
    default:
      return RabbitMsgType.NONE;
  }
}
