/**
 * @fileoverview gRPC-Web generated client stub for 
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


import * as grpcWeb from 'grpc-web';

import {
  AddCategoryRequest,
  BasicResponse,
  CategoriesResponse,
  ChangeAddressesRequest,
  ChangeCategoryRequest,
  ChangeInformationRequest,
  ChangePasswordRequest,
  RegisterRequest,
  SignInRequest,
  UserAddressesResponse,
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

  methodInfoUserChangeAddresses = new grpcWeb.AbstractClientBase.MethodInfo(
    BasicResponse,
    (request: ChangeAddressesRequest) => {
      return request.serializeBinary();
    },
    BasicResponse.deserializeBinary
  );

  userChangeAddresses(
    request: ChangeAddressesRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: BasicResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/Service/UserChangeAddresses',
      request,
      metadata || {},
      this.methodInfoUserChangeAddresses,
      callback);
  }

  methodInfoUserChangeInformation = new grpcWeb.AbstractClientBase.MethodInfo(
    BasicResponse,
    (request: ChangeInformationRequest) => {
      return request.serializeBinary();
    },
    BasicResponse.deserializeBinary
  );

  userChangeInformation(
    request: ChangeInformationRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: BasicResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/Service/UserChangeInformation',
      request,
      metadata || {},
      this.methodInfoUserChangeInformation,
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

  methodInfoGetUserAddresses = new grpcWeb.AbstractClientBase.MethodInfo(
    UserAddressesResponse,
    (request: UserRequest) => {
      return request.serializeBinary();
    },
    UserAddressesResponse.deserializeBinary
  );

  getUserAddresses(
    request: UserRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: UserAddressesResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/Service/GetUserAddresses',
      request,
      metadata || {},
      this.methodInfoGetUserAddresses,
      callback);
  }

  methodInfoGetCategories = new grpcWeb.AbstractClientBase.MethodInfo(
    CategoriesResponse,
    (request: UserRequest) => {
      return request.serializeBinary();
    },
    CategoriesResponse.deserializeBinary
  );

  getCategories(
    request: UserRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: CategoriesResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/Service/GetCategories',
      request,
      metadata || {},
      this.methodInfoGetCategories,
      callback);
  }

  methodInfoAddCategory = new grpcWeb.AbstractClientBase.MethodInfo(
    BasicResponse,
    (request: AddCategoryRequest) => {
      return request.serializeBinary();
    },
    BasicResponse.deserializeBinary
  );

  addCategory(
    request: AddCategoryRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: BasicResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/Service/AddCategory',
      request,
      metadata || {},
      this.methodInfoAddCategory,
      callback);
  }

  methodInfoCategoryChange = new grpcWeb.AbstractClientBase.MethodInfo(
    BasicResponse,
    (request: ChangeCategoryRequest) => {
      return request.serializeBinary();
    },
    BasicResponse.deserializeBinary
  );

  categoryChange(
    request: ChangeCategoryRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: BasicResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/Service/CategoryChange',
      request,
      metadata || {},
      this.methodInfoCategoryChange,
      callback);
  }

}

