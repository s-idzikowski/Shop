import { GreeterClient } from './../../gRPC/GreetServiceClientPb';

abstract class Client {
    static instance: GreeterClient;

    static Instance(): GreeterClient {
        if (!this.instance)
            this.instance = new GreeterClient('https://localhost:5001');

        return this.instance;
    }
}

export default Client;