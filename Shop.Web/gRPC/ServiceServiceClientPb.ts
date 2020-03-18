/**
 * @fileoverview gRPC-Web generated client stub for 
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


import * as grpcWeb from 'grpc-web';

import {
  GetAllUsersRequest,
  GetUserRequest,
  GetUserResponse,
  HelloReply,
  HelloRequest,
  SignInRequest,
  SignInResponse} from './service_pb';

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

  methodInfoGetUserById = new grpcWeb.AbstractClientBase.MethodInfo(
    GetUserResponse,
    (request: GetUserRequest) => {
      return request.serializeBinary();
    },
    GetUserResponse.deserializeBinary
  );

  getUserById(
    request: GetUserRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: GetUserResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/Service/GetUserById',
      request,
      metadata || {},
      this.methodInfoGetUserById,
      callback);
  }

  methodInfoGetAllUsers = new grpcWeb.AbstractClientBase.MethodInfo(
    GetUserResponse,
    (request: GetAllUsersRequest) => {
      return request.serializeBinary();
    },
    GetUserResponse.deserializeBinary
  );

  getAllUsers(
    request: GetAllUsersRequest,
    metadata?: grpcWeb.Metadata) {
    return this.client_.serverStreaming(
      this.hostname_ +
        '/Service/GetAllUsers',
      request,
      metadata || {},
      this.methodInfoGetAllUsers);
  }

}
