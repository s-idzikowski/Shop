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
            'Authorization': window.sessionStorage.getItem("Authorization"),
        };
    }

    public static CheckError(err: grpcWeb.Error, callback: () => void, onErrorCallback: () => void = undefined) {
        if (err) {
            switch (err.code) {
                case grpcWeb.StatusCode.OK:

                    callback();

                    break;
                case grpcWeb.StatusCode.UNAUTHENTICATED:

                    this.Redirect();

                    break;
                default:

                    this.ErrorLog("Code: " + err.code);
                    this.ErrorLog("message: " + decodeURI(err.message));

                    if (onErrorCallback)
                        onErrorCallback();

                    break;
            }
            return;
        }
        
        callback();
    }

    public static ErrorLog(msg: any) {
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

    public static Redirect()
    {
        window.sessionStorage.clear();
        window.location.href = "\\";
    }
}

export default Client;