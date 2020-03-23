import * as grpcWeb from 'grpc-web';
import * as crypto from 'crypto';

import { ServiceClient } from './../../gRPC/ServiceServiceClientPb';

import { toast } from 'react-toastify';
import { UserData } from '../../gRPC/service_pb';

abstract class Client {
    protected static instance: ServiceClient;

    public static Instance(): ServiceClient {
        if (!this.instance)
            this.instance = new ServiceClient('https://localhost:5001');

        return this.instance;
    }

    public static Header(): {} {
        return { 'auth-token': window.sessionStorage.getItem("auth-token") };
    }

    public static CheckError(err: grpcWeb.Error, callback: () => void) {
        if (err && err.code !== grpcWeb.StatusCode.OK) {
            this.ErrorLog("code: " + err.code);
            this.ErrorLog("message: " + decodeURI(err.message));
            return;
        }

        console.log("[SERVICE-RESPONSE]");
        callback();
    }

    protected static ErrorLog(msg: any) {
        const message = "[Error] " + msg;

        console.log(message);
        toast.error(message);
    };

    public static GetUser(): UserData.AsObject {
        return JSON.parse(window.sessionStorage.getItem("user"));
    }

    public static HashSensitiveData(data: any): any {
        const hash = crypto.createHash("sha1");
        hash.update("Ser$ErT" + data + "D@tE");
        return hash.digest('hex');
    }
}

export default Client;