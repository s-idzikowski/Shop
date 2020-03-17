import * as React from 'react';

import Client from '../class/Client';
import { HelloRequest, HelloReply } from '../../gRPC/greet_pb';

const Hello = () => {

    const request: HelloRequest = new HelloRequest();
    request.setName('Hello Slaw!');

    Client.Instance().sayHello(request, {}, (err: any, response: HelloReply) => {
        console.log(response.getMessage());

        //this.setState({
        //    helloReply: response
        //});
    });

    //const response = () => "Response: " + this.state.helloReply.getMessage();
    const waiting = () => "Waiting for response...";

    //<h1>{this.state.helloReply ? response() : waiting()}</h1>
    return (
        <div>
            <h1>{waiting()}</h1>
        </div>
    );
}

export default Hello;