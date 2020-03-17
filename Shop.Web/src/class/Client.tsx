import * as grpcWeb from 'grpc-web';

import { GreeterClient } from './../../gRPC/GreetServiceClientPb';

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
            this.ErrorPauseLog();
            this.ErrorLog('code: ' + err.code);
            this.ErrorLog('message: ' + decodeURI(err.message));
            this.ErrorPauseLog();
            return;
        }
        callback();
    }

    protected static ErrorLog(msg: any) {
        console.log('[Error] ' + msg);
    };

    protected static ErrorPauseLog() {
        this.ErrorLog('==================================================');
    };
}

export default Client;