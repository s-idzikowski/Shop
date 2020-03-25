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
        return { 
            'Authorization' : 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI0MDQwMGU3Ni03YjQ1LTRkNzAtOGU4MS05ZmUwMDYwZmU5MGMiLCJ1bmlxdWVfbmFtZSI6InNhc2EiLCJuYmYiOjE1ODUxMDAzMjcsImV4cCI6MTU4NTE4NjcyNywiaWF0IjoxNTg1MTAwMzI3fQ.iBfy8ruw5bvnrX4e8PSr7JCiWEmFEAGcOSjPl38nEdD-F8rKy7n5XbwsqwUqO2B4dOMZ004RiE_uGFO6CXLavw',
            'auth-token': window.sessionStorage.getItem("auth-token"),
                 };
    }

    public static CheckError(err: grpcWeb.Error, callback: () => void, onErrorCallback: () => void = undefined) {
        if (err && err.code !== grpcWeb.StatusCode.OK) {
            this.ErrorLog("code: " + err.code);
            this.ErrorLog("message: " + decodeURI(err.message));
            if (onErrorCallback)
                onErrorCallback();
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