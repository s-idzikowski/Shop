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

export class SignInResponse extends jspb.Message {
  getStatuscode(): StatusCode;
  setStatuscode(value: StatusCode): void;

  getUserdata(): UserData | undefined;
  setUserdata(value?: UserData): void;
  hasUserdata(): boolean;
  clearUserdata(): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SignInResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SignInResponse): SignInResponse.AsObject;
  static serializeBinaryToWriter(message: SignInResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SignInResponse;
  static deserializeBinaryFromReader(message: SignInResponse, reader: jspb.BinaryReader): SignInResponse;
}

export namespace SignInResponse {
  export type AsObject = {
    statuscode: StatusCode,
    userdata?: UserData.AsObject,
  }
}

export class RegisterResponse extends jspb.Message {
  getStatuscode(): StatusCode;
  setStatuscode(value: StatusCode): void;

  getUserdata(): UserData | undefined;
  setUserdata(value?: UserData): void;
  hasUserdata(): boolean;
  clearUserdata(): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RegisterResponse.AsObject;
  static toObject(includeInstance: boolean, msg: RegisterResponse): RegisterResponse.AsObject;
  static serializeBinaryToWriter(message: RegisterResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RegisterResponse;
  static deserializeBinaryFromReader(message: RegisterResponse, reader: jspb.BinaryReader): RegisterResponse;
}

export namespace RegisterResponse {
  export type AsObject = {
    statuscode: StatusCode,
    userdata?: UserData.AsObject,
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

  getAuthkey(): string;
  setAuthkey(value: string): void;

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
    authkey: string,
  }
}

export class HelloRequest extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): HelloRequest.AsObject;
  static toObject(includeInstance: boolean, msg: HelloRequest): HelloRequest.AsObject;
  static serializeBinaryToWriter(message: HelloRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): HelloRequest;
  static deserializeBinaryFromReader(message: HelloRequest, reader: jspb.BinaryReader): HelloRequest;
}

export namespace HelloRequest {
  export type AsObject = {
    name: string,
  }
}

export class HelloReply extends jspb.Message {
  getHellodata(): HelloData | undefined;
  setHellodata(value?: HelloData): void;
  hasHellodata(): boolean;
  clearHellodata(): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): HelloReply.AsObject;
  static toObject(includeInstance: boolean, msg: HelloReply): HelloReply.AsObject;
  static serializeBinaryToWriter(message: HelloReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): HelloReply;
  static deserializeBinaryFromReader(message: HelloReply, reader: jspb.BinaryReader): HelloReply;
}

export namespace HelloReply {
  export type AsObject = {
    hellodata?: HelloData.AsObject,
  }
}

export class HelloData extends jspb.Message {
  getMessage(): string;
  setMessage(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): HelloData.AsObject;
  static toObject(includeInstance: boolean, msg: HelloData): HelloData.AsObject;
  static serializeBinaryToWriter(message: HelloData, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): HelloData;
  static deserializeBinaryFromReader(message: HelloData, reader: jspb.BinaryReader): HelloData;
}

export namespace HelloData {
  export type AsObject = {
    message: string,
  }
}

export enum StatusCode { 
  OK = 0,
  DATABASE_ERROR = 1,
  UNATHORIZED = 2,
  SIGNIN_NOT_FOUND = 10,
  SIGNIN_ACCOUNT_BAN = 11,
  REGISTER_USERNAME_OCCUPIED = 20,
  REGISTER_PASSWORD_NOT_VALID = 21,
  REGISTER_EMAIL_OCCUPIED = 22,
}
