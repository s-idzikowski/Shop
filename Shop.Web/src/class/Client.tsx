import * as grpcWeb from 'grpc-web';
import * as crypto from 'crypto';

import { ServiceClient } from './../../gRPC/ServiceServiceClientPb';

import { toast } from 'react-toastify';
import { StatusCode, BasicResponse } from '../../gRPC/service_pb';

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

                    this.ErrorLog(decodeURI(err.message));

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

    public static HashSensitiveData(data: any): any {
        const hash = crypto.createHash("sha1");
        hash.update("Ser$ErT" + data + "D@tE");
        return hash.digest('hex');
    }

    public static Redirect() {
        window.sessionStorage.clear();
        window.location.href = "\\";
    }

    public static IsLogged(): boolean {
        const token = window.sessionStorage.getItem("Authorization");
        return !(!token || 0 === token.length);
    }

    public static CheckStatusCode(statuscode: StatusCode, onError: () => any, onSuccess: () => any, onRedirect: () => any) {
        switch (statuscode) {
            case StatusCode.OK:

                if (onSuccess)
                    onSuccess();

                if (onRedirect)
                    onRedirect();

                break;
            case StatusCode.REGISTER_PASSWORD_NOT_VALID:

                if (onError)
                    onError();
                toast.error("Podane hasło nie jest dopuszczalne.");

                break;
            case StatusCode.REGISTER_USERNAME_OCCUPIED:

                if (onError)
                    onError();
                toast.error("Podana nazwa użytkownika jest już zajęta.");

                break;
            case StatusCode.REGISTER_EMAIL_OCCUPIED:

                if (onError)
                    onError();
                toast.error("Podany adres email jest już zajęty.");

                break;

            case StatusCode.SIGNIN_NOT_FOUND:

                if (onError)
                    onError();
                toast.error("Nazwa użytkownika lub hasło jest niepoprawne.");

                break;
            case StatusCode.SIGNIN_ACCOUNT_BAN:

                if (onError)
                    onError();
                toast.error("Twoje konto jest zawieszone.");

                break;
            case StatusCode.DATABASE_ERROR:

                if (onError)
                    onError();
                toast.error("Błąd bazy danych.");

                break;

            case StatusCode.UNATHORIZED:

                window.sessionStorage.clear();
                toast.info("Błąd - wylogowano!");

                if (onRedirect)
                    onRedirect();

                break;
        }
    }
}

export default Client;