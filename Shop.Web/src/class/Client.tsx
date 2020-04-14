import * as grpcWeb from 'grpc-web';

import { ServiceClient } from '../../gRPC/ServiceServiceClientPb';

import { toast } from 'react-toastify';
import { StatusCode } from '../../gRPC/service_pb';

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

    public static CheckError(err: grpcWeb.Error, callback: () => void, onErrorCallback: () => void = undefined): void {
        if (err) {
            switch (err.code) {
                case grpcWeb.StatusCode.OK:

                    callback();

                    break;
                case grpcWeb.StatusCode.UNAUTHENTICATED:

                    this.Redirect();

                    break;
                case grpcWeb.StatusCode.PERMISSION_DENIED:

                    this.ErrorLog("PERMISSION_DENIED");

                    if (onErrorCallback)
                        onErrorCallback();

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

    public static ErrorLog(msg: string): void {
        const message = "[Error] " + msg;

        console.log(message);
        toast.error(message);
    };

    public static Redirect(): void {
        window.sessionStorage.clear();
        window.location.href = "\\";
    }

    public static IsLogged(): boolean {
        const token = window.sessionStorage.getItem("Authorization");
        return !(!token || 0 === token.length);
    }

    public static CheckStatusCode(statuscode: StatusCode, onError: () => void, onSuccess: () => void, onRedirect: () => void): void {
        switch (statuscode) {
            case StatusCode.OK:

                if (onSuccess)
                    onSuccess();

                if (onRedirect)
                    onRedirect();

                break;
            case StatusCode.PASSWORD_NOT_VALID:

                if (onError)
                    onError();
                toast.error("Podane hasło nie jest dopuszczalne.");

                break;
            case StatusCode.USERNAME_OCCUPIED:

                if (onError)
                    onError();
                toast.error("Podana nazwa użytkownika jest już zajęta.");

                break;
            case StatusCode.EMAIL_OCCUPIED:

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

            case StatusCode.CHANGEPASSWORD_SAME:

                if (onError)
                    onError();
                toast.warn("Podane hasła są takie same.");

                break;
            case StatusCode.CHANGEPASSWORD_WRONG_OLD_PASSWORD:

                if (onError)
                    onError();
                toast.warn("Podano błędne stare hasło.");

                break;

            case StatusCode.EMPTY_CHANGES:

                if (onError)
                    onError();
                toast.info("Nie wprowadzono żadnych zmian.");

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