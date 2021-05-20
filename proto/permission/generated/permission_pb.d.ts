// package: permission
// file: permission.proto

import * as jspb from "google-protobuf";

export class CreatePermissionRequest extends jspb.Message {
  getFileid(): string;
  setFileid(value: string): void;

  getUserid(): string;
  setUserid(value: string): void;

  getRole(): RoleMap[keyof RoleMap];
  setRole(value: RoleMap[keyof RoleMap]): void;

  getCreator(): string;
  setCreator(value: string): void;

  getOverride(): boolean;
  setOverride(value: boolean): void;

  getAppid(): string;
  setAppid(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreatePermissionRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreatePermissionRequest): CreatePermissionRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreatePermissionRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreatePermissionRequest;
  static deserializeBinaryFromReader(message: CreatePermissionRequest, reader: jspb.BinaryReader): CreatePermissionRequest;
}

export namespace CreatePermissionRequest {
  export type AsObject = {
    fileid: string,
    userid: string,
    role: RoleMap[keyof RoleMap],
    creator: string,
    override: boolean,
    appid: string,
  }
}

export class DeletePermissionRequest extends jspb.Message {
  getFileid(): string;
  setFileid(value: string): void;

  getUserid(): string;
  setUserid(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeletePermissionRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeletePermissionRequest): DeletePermissionRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DeletePermissionRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeletePermissionRequest;
  static deserializeBinaryFromReader(message: DeletePermissionRequest, reader: jspb.BinaryReader): DeletePermissionRequest;
}

export namespace DeletePermissionRequest {
  export type AsObject = {
    fileid: string,
    userid: string,
  }
}

export class PermissionObject extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getFileid(): string;
  setFileid(value: string): void;

  getUserid(): string;
  setUserid(value: string): void;

  getRole(): RoleMap[keyof RoleMap];
  setRole(value: RoleMap[keyof RoleMap]): void;

  getCreator(): string;
  setCreator(value: string): void;

  getAppid(): string;
  setAppid(value: string): void;

  getCreatedat(): number;
  setCreatedat(value: number): void;

  getUpdatedat(): number;
  setUpdatedat(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PermissionObject.AsObject;
  static toObject(includeInstance: boolean, msg: PermissionObject): PermissionObject.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PermissionObject, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PermissionObject;
  static deserializeBinaryFromReader(message: PermissionObject, reader: jspb.BinaryReader): PermissionObject;
}

export namespace PermissionObject {
  export type AsObject = {
    id: string,
    fileid: string,
    userid: string,
    role: RoleMap[keyof RoleMap],
    creator: string,
    appid: string,
    createdat: number,
    updatedat: number,
  }
}

export class GetPermissionRequest extends jspb.Message {
  getFileid(): string;
  setFileid(value: string): void;

  getUserid(): string;
  setUserid(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetPermissionRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetPermissionRequest): GetPermissionRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetPermissionRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetPermissionRequest;
  static deserializeBinaryFromReader(message: GetPermissionRequest, reader: jspb.BinaryReader): GetPermissionRequest;
}

export namespace GetPermissionRequest {
  export type AsObject = {
    fileid: string,
    userid: string,
  }
}

export class GetPermissionByMongoIDRequest extends jspb.Message {
  getMongoid(): string;
  setMongoid(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetPermissionByMongoIDRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetPermissionByMongoIDRequest): GetPermissionByMongoIDRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetPermissionByMongoIDRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetPermissionByMongoIDRequest;
  static deserializeBinaryFromReader(message: GetPermissionByMongoIDRequest, reader: jspb.BinaryReader): GetPermissionByMongoIDRequest;
}

export namespace GetPermissionByMongoIDRequest {
  export type AsObject = {
    mongoid: string,
  }
}

export class GetFilePermissionsRequest extends jspb.Message {
  getFileid(): string;
  setFileid(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetFilePermissionsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetFilePermissionsRequest): GetFilePermissionsRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetFilePermissionsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetFilePermissionsRequest;
  static deserializeBinaryFromReader(message: GetFilePermissionsRequest, reader: jspb.BinaryReader): GetFilePermissionsRequest;
}

export namespace GetFilePermissionsRequest {
  export type AsObject = {
    fileid: string,
  }
}

export class GetFilePermissionsResponse extends jspb.Message {
  clearPermissionsList(): void;
  getPermissionsList(): Array<GetFilePermissionsResponse.UserRole>;
  setPermissionsList(value: Array<GetFilePermissionsResponse.UserRole>): void;
  addPermissions(value?: GetFilePermissionsResponse.UserRole, index?: number): GetFilePermissionsResponse.UserRole;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetFilePermissionsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetFilePermissionsResponse): GetFilePermissionsResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetFilePermissionsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetFilePermissionsResponse;
  static deserializeBinaryFromReader(message: GetFilePermissionsResponse, reader: jspb.BinaryReader): GetFilePermissionsResponse;
}

export namespace GetFilePermissionsResponse {
  export type AsObject = {
    permissionsList: Array<GetFilePermissionsResponse.UserRole.AsObject>,
  }

  export class UserRole extends jspb.Message {
    getUserid(): string;
    setUserid(value: string): void;

    getRole(): RoleMap[keyof RoleMap];
    setRole(value: RoleMap[keyof RoleMap]): void;

    getCreator(): string;
    setCreator(value: string): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UserRole.AsObject;
    static toObject(includeInstance: boolean, msg: UserRole): UserRole.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UserRole, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UserRole;
    static deserializeBinaryFromReader(message: UserRole, reader: jspb.BinaryReader): UserRole;
  }

  export namespace UserRole {
    export type AsObject = {
      userid: string,
      role: RoleMap[keyof RoleMap],
      creator: string,
    }
  }
}

export class IsPermittedRequest extends jspb.Message {
  getFileid(): string;
  setFileid(value: string): void;

  getUserid(): string;
  setUserid(value: string): void;

  getRole(): RoleMap[keyof RoleMap];
  setRole(value: RoleMap[keyof RoleMap]): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): IsPermittedRequest.AsObject;
  static toObject(includeInstance: boolean, msg: IsPermittedRequest): IsPermittedRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: IsPermittedRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): IsPermittedRequest;
  static deserializeBinaryFromReader(message: IsPermittedRequest, reader: jspb.BinaryReader): IsPermittedRequest;
}

export namespace IsPermittedRequest {
  export type AsObject = {
    fileid: string,
    userid: string,
    role: RoleMap[keyof RoleMap],
  }
}

export class IsPermittedResponse extends jspb.Message {
  getPermitted(): boolean;
  setPermitted(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): IsPermittedResponse.AsObject;
  static toObject(includeInstance: boolean, msg: IsPermittedResponse): IsPermittedResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: IsPermittedResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): IsPermittedResponse;
  static deserializeBinaryFromReader(message: IsPermittedResponse, reader: jspb.BinaryReader): IsPermittedResponse;
}

export namespace IsPermittedResponse {
  export type AsObject = {
    permitted: boolean,
  }
}

export class GetUserPermissionsRequest extends jspb.Message {
  getUserid(): string;
  setUserid(value: string): void;

  getPagenum(): number;
  setPagenum(value: number): void;

  getPagesize(): number;
  setPagesize(value: number): void;

  getIsshared(): boolean;
  setIsshared(value: boolean): void;

  getAppid(): string;
  setAppid(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetUserPermissionsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetUserPermissionsRequest): GetUserPermissionsRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetUserPermissionsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetUserPermissionsRequest;
  static deserializeBinaryFromReader(message: GetUserPermissionsRequest, reader: jspb.BinaryReader): GetUserPermissionsRequest;
}

export namespace GetUserPermissionsRequest {
  export type AsObject = {
    userid: string,
    pagenum: number,
    pagesize: number,
    isshared: boolean,
    appid: string,
  }
}

export class GetUserPermissionsResponse extends jspb.Message {
  clearPermissionsList(): void;
  getPermissionsList(): Array<GetUserPermissionsResponse.FileRole>;
  setPermissionsList(value: Array<GetUserPermissionsResponse.FileRole>): void;
  addPermissions(value?: GetUserPermissionsResponse.FileRole, index?: number): GetUserPermissionsResponse.FileRole;

  getItemcount(): number;
  setItemcount(value: number): void;

  getPagenum(): number;
  setPagenum(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetUserPermissionsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetUserPermissionsResponse): GetUserPermissionsResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetUserPermissionsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetUserPermissionsResponse;
  static deserializeBinaryFromReader(message: GetUserPermissionsResponse, reader: jspb.BinaryReader): GetUserPermissionsResponse;
}

export namespace GetUserPermissionsResponse {
  export type AsObject = {
    permissionsList: Array<GetUserPermissionsResponse.FileRole.AsObject>,
    itemcount: number,
    pagenum: number,
  }

  export class FileRole extends jspb.Message {
    getFileid(): string;
    setFileid(value: string): void;

    getRole(): RoleMap[keyof RoleMap];
    setRole(value: RoleMap[keyof RoleMap]): void;

    getCreator(): string;
    setCreator(value: string): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): FileRole.AsObject;
    static toObject(includeInstance: boolean, msg: FileRole): FileRole.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: FileRole, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): FileRole;
    static deserializeBinaryFromReader(message: FileRole, reader: jspb.BinaryReader): FileRole;
  }

  export namespace FileRole {
    export type AsObject = {
      fileid: string,
      role: RoleMap[keyof RoleMap],
      creator: string,
    }
  }
}

export class DeleteFilePermissionsRequest extends jspb.Message {
  getFileid(): string;
  setFileid(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteFilePermissionsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteFilePermissionsRequest): DeleteFilePermissionsRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DeleteFilePermissionsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteFilePermissionsRequest;
  static deserializeBinaryFromReader(message: DeleteFilePermissionsRequest, reader: jspb.BinaryReader): DeleteFilePermissionsRequest;
}

export namespace DeleteFilePermissionsRequest {
  export type AsObject = {
    fileid: string,
  }
}

export class DeleteFilePermissionsResponse extends jspb.Message {
  clearPermissionsList(): void;
  getPermissionsList(): Array<PermissionObject>;
  setPermissionsList(value: Array<PermissionObject>): void;
  addPermissions(value?: PermissionObject, index?: number): PermissionObject;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteFilePermissionsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteFilePermissionsResponse): DeleteFilePermissionsResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DeleteFilePermissionsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteFilePermissionsResponse;
  static deserializeBinaryFromReader(message: DeleteFilePermissionsResponse, reader: jspb.BinaryReader): DeleteFilePermissionsResponse;
}

export namespace DeleteFilePermissionsResponse {
  export type AsObject = {
    permissionsList: Array<PermissionObject.AsObject>,
  }
}

export interface RoleMap {
  NONE: 0;
  WRITE: 1;
  READ: 2;
}

export const Role: RoleMap;

