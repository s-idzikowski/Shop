import * as grpcWeb from 'grpc-web';

import { GreeterClient } from './../../gRPC/GreetServiceClientPb';

abstract class Client {
    static instance: GreeterClient;

    static Instance(): GreeterClient {
        if (!this.instance)
            this.instance = new GreeterClient('https://localhost:5001');

        return this.instance;
    }

    static Header(): {} {
        return { 'custom-header-1': 'value1' };
    }

    static CheckError(err: grpcWeb.Error, callback: () => void) {
        if (err && err.code !== grpcWeb.StatusCode.OK) {
            console.log('Error code: ' + err.code + ' "' + decodeURI(err.message) + '"');
            return;
        }
        callback();
    }
}

export default Client;