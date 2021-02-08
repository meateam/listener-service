// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var permission_pb = require('./permission_pb.js');

function serialize_permission_CreatePermissionRequest(arg) {
  if (!(arg instanceof permission_pb.CreatePermissionRequest)) {
    throw new Error('Expected argument of type permission.CreatePermissionRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_permission_CreatePermissionRequest(buffer_arg) {
  return permission_pb.CreatePermissionRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_permission_DeleteFilePermissionsRequest(arg) {
  if (!(arg instanceof permission_pb.DeleteFilePermissionsRequest)) {
    throw new Error('Expected argument of type permission.DeleteFilePermissionsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_permission_DeleteFilePermissionsRequest(buffer_arg) {
  return permission_pb.DeleteFilePermissionsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_permission_DeleteFilePermissionsResponse(arg) {
  if (!(arg instanceof permission_pb.DeleteFilePermissionsResponse)) {
    throw new Error('Expected argument of type permission.DeleteFilePermissionsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_permission_DeleteFilePermissionsResponse(buffer_arg) {
  return permission_pb.DeleteFilePermissionsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_permission_DeletePermissionRequest(arg) {
  if (!(arg instanceof permission_pb.DeletePermissionRequest)) {
    throw new Error('Expected argument of type permission.DeletePermissionRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_permission_DeletePermissionRequest(buffer_arg) {
  return permission_pb.DeletePermissionRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_permission_GetFilePermissionsRequest(arg) {
  if (!(arg instanceof permission_pb.GetFilePermissionsRequest)) {
    throw new Error('Expected argument of type permission.GetFilePermissionsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_permission_GetFilePermissionsRequest(buffer_arg) {
  return permission_pb.GetFilePermissionsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_permission_GetFilePermissionsResponse(arg) {
  if (!(arg instanceof permission_pb.GetFilePermissionsResponse)) {
    throw new Error('Expected argument of type permission.GetFilePermissionsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_permission_GetFilePermissionsResponse(buffer_arg) {
  return permission_pb.GetFilePermissionsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_permission_GetPermissionByMongoIDRequest(arg) {
  if (!(arg instanceof permission_pb.GetPermissionByMongoIDRequest)) {
    throw new Error('Expected argument of type permission.GetPermissionByMongoIDRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_permission_GetPermissionByMongoIDRequest(buffer_arg) {
  return permission_pb.GetPermissionByMongoIDRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_permission_GetPermissionRequest(arg) {
  if (!(arg instanceof permission_pb.GetPermissionRequest)) {
    throw new Error('Expected argument of type permission.GetPermissionRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_permission_GetPermissionRequest(buffer_arg) {
  return permission_pb.GetPermissionRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_permission_GetUserPermissionsRequest(arg) {
  if (!(arg instanceof permission_pb.GetUserPermissionsRequest)) {
    throw new Error('Expected argument of type permission.GetUserPermissionsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_permission_GetUserPermissionsRequest(buffer_arg) {
  return permission_pb.GetUserPermissionsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_permission_GetUserPermissionsResponse(arg) {
  if (!(arg instanceof permission_pb.GetUserPermissionsResponse)) {
    throw new Error('Expected argument of type permission.GetUserPermissionsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_permission_GetUserPermissionsResponse(buffer_arg) {
  return permission_pb.GetUserPermissionsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_permission_IsPermittedRequest(arg) {
  if (!(arg instanceof permission_pb.IsPermittedRequest)) {
    throw new Error('Expected argument of type permission.IsPermittedRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_permission_IsPermittedRequest(buffer_arg) {
  return permission_pb.IsPermittedRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_permission_IsPermittedResponse(arg) {
  if (!(arg instanceof permission_pb.IsPermittedResponse)) {
    throw new Error('Expected argument of type permission.IsPermittedResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_permission_IsPermittedResponse(buffer_arg) {
  return permission_pb.IsPermittedResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_permission_PermissionObject(arg) {
  if (!(arg instanceof permission_pb.PermissionObject)) {
    throw new Error('Expected argument of type permission.PermissionObject');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_permission_PermissionObject(buffer_arg) {
  return permission_pb.PermissionObject.deserializeBinary(new Uint8Array(buffer_arg));
}


var PermissionService = exports.PermissionService = {
  // CreatePermission creates a new permission and returns it, if permission already exists, update it.
createPermission: {
    path: '/permission.Permission/CreatePermission',
    requestStream: false,
    responseStream: false,
    requestType: permission_pb.CreatePermissionRequest,
    responseType: permission_pb.PermissionObject,
    requestSerialize: serialize_permission_CreatePermissionRequest,
    requestDeserialize: deserialize_permission_CreatePermissionRequest,
    responseSerialize: serialize_permission_PermissionObject,
    responseDeserialize: deserialize_permission_PermissionObject,
  },
  // DeletePermission deletes a permission and returns it.
deletePermission: {
    path: '/permission.Permission/DeletePermission',
    requestStream: false,
    responseStream: false,
    requestType: permission_pb.DeletePermissionRequest,
    responseType: permission_pb.PermissionObject,
    requestSerialize: serialize_permission_DeletePermissionRequest,
    requestDeserialize: deserialize_permission_DeletePermissionRequest,
    responseSerialize: serialize_permission_PermissionObject,
    responseDeserialize: deserialize_permission_PermissionObject,
  },
  // GetFilePermissions returns the users and their role that have a permission to fileID.
getFilePermissions: {
    path: '/permission.Permission/GetFilePermissions',
    requestStream: false,
    responseStream: false,
    requestType: permission_pb.GetFilePermissionsRequest,
    responseType: permission_pb.GetFilePermissionsResponse,
    requestSerialize: serialize_permission_GetFilePermissionsRequest,
    requestDeserialize: deserialize_permission_GetFilePermissionsRequest,
    responseSerialize: serialize_permission_GetFilePermissionsResponse,
    responseDeserialize: deserialize_permission_GetFilePermissionsResponse,
  },
  // GetUserPermissions returns the files that the user was given permission to.
getUserPermissions: {
    path: '/permission.Permission/GetUserPermissions',
    requestStream: false,
    responseStream: false,
    requestType: permission_pb.GetUserPermissionsRequest,
    responseType: permission_pb.GetUserPermissionsResponse,
    requestSerialize: serialize_permission_GetUserPermissionsRequest,
    requestDeserialize: deserialize_permission_GetUserPermissionsRequest,
    responseSerialize: serialize_permission_GetUserPermissionsResponse,
    responseDeserialize: deserialize_permission_GetUserPermissionsResponse,
  },
  // IsPermitted returns true if userID is permitted to a fileID with the wanted role.
isPermitted: {
    path: '/permission.Permission/IsPermitted',
    requestStream: false,
    responseStream: false,
    requestType: permission_pb.IsPermittedRequest,
    responseType: permission_pb.IsPermittedResponse,
    requestSerialize: serialize_permission_IsPermittedRequest,
    requestDeserialize: deserialize_permission_IsPermittedRequest,
    responseSerialize: serialize_permission_IsPermittedResponse,
    responseDeserialize: deserialize_permission_IsPermittedResponse,
  },
  // DeleteFilePermissions deletes all permissions of a file and returns them.
deleteFilePermissions: {
    path: '/permission.Permission/DeleteFilePermissions',
    requestStream: false,
    responseStream: false,
    requestType: permission_pb.DeleteFilePermissionsRequest,
    responseType: permission_pb.DeleteFilePermissionsResponse,
    requestSerialize: serialize_permission_DeleteFilePermissionsRequest,
    requestDeserialize: deserialize_permission_DeleteFilePermissionsRequest,
    responseSerialize: serialize_permission_DeleteFilePermissionsResponse,
    responseDeserialize: deserialize_permission_DeleteFilePermissionsResponse,
  },
  // GetPermission returns a permission of the user to a file.
getPermission: {
    path: '/permission.Permission/GetPermission',
    requestStream: false,
    responseStream: false,
    requestType: permission_pb.GetPermissionRequest,
    responseType: permission_pb.PermissionObject,
    requestSerialize: serialize_permission_GetPermissionRequest,
    requestDeserialize: deserialize_permission_GetPermissionRequest,
    responseSerialize: serialize_permission_PermissionObject,
    responseDeserialize: deserialize_permission_PermissionObject,
  },
  // GetPermission returns a permission of by its mongoID.
getPermissionByMongoID: {
    path: '/permission.Permission/GetPermissionByMongoID',
    requestStream: false,
    responseStream: false,
    requestType: permission_pb.GetPermissionByMongoIDRequest,
    responseType: permission_pb.PermissionObject,
    requestSerialize: serialize_permission_GetPermissionByMongoIDRequest,
    requestDeserialize: deserialize_permission_GetPermissionByMongoIDRequest,
    responseSerialize: serialize_permission_PermissionObject,
    responseDeserialize: deserialize_permission_PermissionObject,
  },
};

exports.PermissionClient = grpc.makeGenericClientConstructor(PermissionService);
