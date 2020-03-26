import * as jspb from "google-protobuf"

export class SignInRequest extends jspb.Message {
  getSignindata(): SignInData | undefined;
  setSignindata(value?: SignInData): void;
  hasSignindata(): boolean;
  clearSignindata(): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SignInRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SignInRequest): SignInRequest.AsObject;
  static serializeBinaryToWriter(message: SignInRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SignInRequest;
  static deserializeBinaryFromReader(message: SignInRequest, reader: jspb.BinaryReader): SignInRequest;
}

export namespace SignInRequest {
  export type AsObject = {
    signindata?: SignInData.AsObject,
  }
}

export class RegisterRequest extends jspb.Message {
  getRegisterdata(): RegisterData | undefined;
  setRegisterdata(value?: RegisterData): void;
  hasRegisterdata(): boolean;
  clearRegisterdata(): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RegisterRequest.AsObject;
  static toObject(includeInstance: boolean, msg: RegisterRequest): RegisterRequest.AsObject;
  static serializeBinaryToWriter(message: RegisterRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RegisterRequest;
  static deserializeBinaryFromReader(message: RegisterRequest, reader: jspb.BinaryReader): RegisterRequest;
}

export namespace RegisterRequest {
  export type AsObject = {
    registerdata?: RegisterData.AsObject,
  }
}

export class UserRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UserRequest): UserRequest.AsObject;
  static serializeBinaryToWriter(message: UserRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserRequest;
  static deserializeBinaryFromReader(message: UserRequest, reader: jspb.BinaryReader): UserRequest;
}

export namespace UserRequest {
  export type AsObject = {
  }
}

export class ChangePasswordRequest extends jspb.Message {
  getOldpassword(): string;
  setOldpassword(value: string): void;

  getNewpassword(): string;
  setNewpassword(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ChangePasswordRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ChangePasswordRequest): ChangePasswordRequest.AsObject;
  static serializeBinaryToWriter(message: ChangePasswordRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ChangePasswordRequest;
  static deserializeBinaryFromReader(message: ChangePasswordRequest, reader: jspb.BinaryReader): ChangePasswordRequest;
}

export namespace ChangePasswordRequest {
  export type AsObject = {
    oldpassword: string,
    newpassword: string,
  }
}

export class BasicResponse extends jspb.Message {
  getStatuscode(): StatusCode;
  setStatuscode(value: StatusCode): void;

  getAuthorization(): string;
  setAuthorization(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BasicResponse.AsObject;
  static toObject(includeInstance: boolean, msg: BasicResponse): BasicResponse.AsObject;
  static serializeBinaryToWriter(message: BasicResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BasicResponse;
  static deserializeBinaryFromReader(message: BasicResponse, reader: jspb.BinaryReader): BasicResponse;
}

export namespace BasicResponse {
  export type AsObject = {
    statuscode: StatusCode,
    authorization: string,
  }
}

export class UserResponse extends jspb.Message {
  getStatuscode(): StatusCode;
  setStatuscode(value: StatusCode): void;

  getUserdata(): UserData | undefined;
  setUserdata(value?: UserData): void;
  hasUserdata(): boolean;
  clearUserdata(): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UserResponse): UserResponse.AsObject;
  static serializeBinaryToWriter(message: UserResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserResponse;
  static deserializeBinaryFromReader(message: UserResponse, reader: jspb.BinaryReader): UserResponse;
}

export namespace UserResponse {
  export type AsObject = {
    statuscode: StatusCode,
    userdata?: UserData.AsObject,
  }
}

export class UserOperationsResponse extends jspb.Message {
  getStatuscode(): StatusCode;
  setStatuscode(value: StatusCode): void;

  getOperationdataList(): Array<OperationData>;
  setOperationdataList(value: Array<OperationData>): void;
  clearOperationdataList(): void;
  addOperationdata(value?: OperationData, index?: number): OperationData;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserOperationsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UserOperationsResponse): UserOperationsResponse.AsObject;
  static serializeBinaryToWriter(message: UserOperationsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserOperationsResponse;
  static deserializeBinaryFromReader(message: UserOperationsResponse, reader: jspb.BinaryReader): UserOperationsResponse;
}

export namespace UserOperationsResponse {
  export type AsObject = {
    statuscode: StatusCode,
    operationdataList: Array<OperationData.AsObject>,
  }
}

export class SignInData extends jspb.Message {
  getUsername(): string;
  setUsername(value: string): void;

  getPassword(): string;
  setPassword(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SignInData.AsObject;
  static toObject(includeInstance: boolean, msg: SignInData): SignInData.AsObject;
  static serializeBinaryToWriter(message: SignInData, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SignInData;
  static deserializeBinaryFromReader(message: SignInData, reader: jspb.BinaryReader): SignInData;
}

export namespace SignInData {
  export type AsObject = {
    username: string,
    password: string,
  }
}

export class RegisterData extends jspb.Message {
  getUsername(): string;
  setUsername(value: string): void;

  getPassword(): string;
  setPassword(value: string): void;

  getEmailaddress(): string;
  setEmailaddress(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RegisterData.AsObject;
  static toObject(includeInstance: boolean, msg: RegisterData): RegisterData.AsObject;
  static serializeBinaryToWriter(message: RegisterData, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RegisterData;
  static deserializeBinaryFromReader(message: RegisterData, reader: jspb.BinaryReader): RegisterData;
}

export namespace RegisterData {
  export type AsObject = {
    username: string,
    password: string,
    emailaddress: string,
  }
}

export class UserData extends jspb.Message {
  getUsername(): string;
  setUsername(value: string): void;

  getEmail(): string;
  setEmail(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserData.AsObject;
  static toObject(includeInstance: boolean, msg: UserData): UserData.AsObject;
  static serializeBinaryToWriter(message: UserData, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserData;
  static deserializeBinaryFromReader(message: UserData, reader: jspb.BinaryReader): UserData;
}

export namespace UserData {
  export type AsObject = {
    username: string,
    email: string,
  }
}

export class OperationData extends jspb.Message {
  getType(): OperationTypes;
  setType(value: OperationTypes): void;

  getTime(): string;
  setTime(value: string): void;

  getIp(): string;
  setIp(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): OperationData.AsObject;
  static toObject(includeInstance: boolean, msg: OperationData): OperationData.AsObject;
  static serializeBinaryToWriter(message: OperationData, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): OperationData;
  static deserializeBinaryFromReader(message: OperationData, reader: jspb.BinaryReader): OperationData;
}

export namespace OperationData {
  export type AsObject = {
    type: OperationTypes,
    time: string,
    ip: string,
  }
}

export enum StatusCode { 
  OK = 0,
  DATABASE_ERROR = 1,
  UNATHORIZED = 2,
  SIGNIN_NOT_FOUND = 10,
  SIGNIN_ACCOUNT_BAN = 11,
  REGISTER_USERNAME_OCCUPIED = 20,
  PASSWORD_NOT_VALID = 21,
  REGISTER_EMAIL_OCCUPIED = 22,
  CHANGEPASSWORD_SAME = 30,
  CHANGEPASSWORD_WRONG_OLD_PASSWORD = 31,
}
export enum OperationTypes { 
  REGISTER = 0,
  LOGIN = 1,
  FAILEDLOGIN = 2,
  LOGOUT = 3,
  CHANGEPASSWORD = 10,
}
