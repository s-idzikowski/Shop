import * as grpcWeb from 'grpc-web';

import { GreeterClient } from './../../gRPC/ServiceServiceClientPb';

import { toast } from 'react-toastify';

abstract class Client {
    protected static instance: GreeterClient;

    public static Instance(): GreeterClient {
        if (!this.instance)
            this.instance = new GreeterClient('https://localhost:5001');
            
        return this.instance;
    }

    public static Header(): {} {
        return { 'custom-header-1': 'value1' };
    }

    public static CheckError(err: grpcWeb.Error, callback: () => void) {
        if (err && err.code !== grpcWeb.StatusCode.OK) {
            this.ErrorLog("code: " + err.code);
            this.ErrorLog("message: " + decodeURI(err.message));
            return;
        }

        toast.success("[SERVICE-RESPONSE]");
        callback();
    }

    protected static ErrorLog(msg: any) {
        const message = "[Error] " + msg;

        console.log(message);
        toast.error(message);
    };
}

export default Client;