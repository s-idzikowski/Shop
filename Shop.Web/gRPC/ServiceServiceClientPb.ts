/**
 * @fileoverview gRPC-Web generated client stub for 
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


import * as grpcWeb from 'grpc-web';

import {
  BasicResponse,
  ChangePasswordRequest,
  RegisterRequest,
  SignInRequest,
  UserOperationsResponse,
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
    BasicResponse,
    (request: SignInRequest) => {
      return request.serializeBinary();
    },
    BasicResponse.deserializeBinary
  );

  userSignIn(
    request: SignInRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: BasicResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/Service/UserSignIn',
      request,
      metadata || {},
      this.methodInfoUserSignIn,
      callback);
  }

  methodInfoUserRegister = new grpcWeb.AbstractClientBase.MethodInfo(
    BasicResponse,
    (request: RegisterRequest) => {
      return request.serializeBinary();
    },
    BasicResponse.deserializeBinary
  );

  userRegister(
    request: RegisterRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: BasicResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/Service/UserRegister',
      request,
      metadata || {},
      this.methodInfoUserRegister,
      callback);
  }

  methodInfoUserLogout = new grpcWeb.AbstractClientBase.MethodInfo(
    BasicResponse,
    (request: UserRequest) => {
      return request.serializeBinary();
    },
    BasicResponse.deserializeBinary
  );

  userLogout(
    request: UserRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: BasicResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/Service/UserLogout',
      request,
      metadata || {},
      this.methodInfoUserLogout,
      callback);
  }

  methodInfoUserChangePassword = new grpcWeb.AbstractClientBase.MethodInfo(
    BasicResponse,
    (request: ChangePasswordRequest) => {
      return request.serializeBinary();
    },
    BasicResponse.deserializeBinary
  );

  userChangePassword(
    request: ChangePasswordRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: BasicResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/Service/UserChangePassword',
      request,
      metadata || {},
      this.methodInfoUserChangePassword,
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
    UserOperationsResponse,
    (request: UserRequest) => {
      return request.serializeBinary();
    },
    UserOperationsResponse.deserializeBinary
  );

  getUserOperations(
    request: UserRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: UserOperationsResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/Service/GetUserOperations',
      request,
      metadata || {},
      this.methodInfoGetUserOperations,
      callback);
  }

}

