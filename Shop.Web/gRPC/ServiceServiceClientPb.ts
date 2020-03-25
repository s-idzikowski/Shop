/**
 * @fileoverview gRPC-Web generated client stub for 
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


import * as grpcWeb from 'grpc-web';

import {
  HelloReply,
  HelloRequest,
  LogoutResponse,
  RegisterRequest,
  RegisterResponse,
  SignInRequest,
  SignInResponse,
  UserOperation,
  UserRequest,
  UserResponse} from './service_pb';

export class ServiceClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: string; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: string; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'binary';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodInfoUserSignIn = new grpcWeb.AbstractClientBase.MethodInfo(
    SignInResponse,
    (request: SignInRequest) => {
      return request.serializeBinary();
    },
    SignInResponse.deserializeBinary
  );

  userSignIn(
    request: SignInRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: SignInResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/Service/UserSignIn',
      request,
      metadata || {},
      this.methodInfoUserSignIn,
      callback);
  }

  methodInfoUserRegister = new grpcWeb.AbstractClientBase.MethodInfo(
    RegisterResponse,
    (request: RegisterRequest) => {
      return request.serializeBinary();
    },
    RegisterResponse.deserializeBinary
  );

  userRegister(
    request: RegisterRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: RegisterResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/Service/UserRegister',
      request,
      metadata || {},
      this.methodInfoUserRegister,
      callback);
  }

  methodInfoUserLogout = new grpcWeb.AbstractClientBase.MethodInfo(
    LogoutResponse,
    (request: UserRequest) => {
      return request.serializeBinary();
    },
    LogoutResponse.deserializeBinary
  );

  userLogout(
    request: UserRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: LogoutResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/Service/UserLogout',
      request,
      metadata || {},
      this.methodInfoUserLogout,
      callback);
  }

  methodInfoGetUser = new grpcWeb.AbstractClientBase.MethodInfo(
    UserResponse,
    (request: UserRequest) => {
      return request.serializeBinary();
    },
    UserResponse.deserializeBinary
  );

  getUser(
    request: UserRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: UserResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/Service/GetUser',
      request,
      metadata || {},
      this.methodInfoGetUser,
      callback);
  }

  methodInfoGetUserOperations = new grpcWeb.AbstractClientBase.MethodInfo(
    UserOperation,
    (request: UserRequest) => {
      return request.serializeBinary();
    },
    UserOperation.deserializeBinary
  );

  getUserOperations(
    request: UserRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: UserOperation) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/Service/GetUserOperations',
      request,
      metadata || {},
      this.methodInfoGetUserOperations,
      callback);
  }

  methodInfoSayHello = new grpcWeb.AbstractClientBase.MethodInfo(
    HelloReply,
    (request: HelloRequest) => {
      return request.serializeBinary();
    },
    HelloReply.deserializeBinary
  );

  sayHello(
    request: HelloRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: HelloReply) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/Service/SayHello',
      request,
      metadata || {},
      this.methodInfoSayHello,
      callback);
  }

}

