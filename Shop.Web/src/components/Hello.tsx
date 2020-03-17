import * as React from 'react';

import { GreeterClient } from '../../gRPC/GreetServiceClientPb';
import { HelloRequest, HelloReply } from '../../gRPC/greet_pb';

interface IProps {
    greeterClient: GreeterClient
}

const Hello = (props: IProps) => {

    const request: HelloRequest = new HelloRequest();
    request.setName('Hello Slaw!');

    props.greeterClient.sayHello(request, {}, (err: any, response: HelloReply) => {
        console.log(response.getMessage());

        //this.setState({
        //    helloReply: response
        //});
    });

    //const response = () => "Response: " + this.state.helloReply.getMessage();
    const waiting = () => "Waiting for response...";

    //<h1>{this.state.helloReply ? response : waiting}</h1>
    return (
        <div>
            <h1>{waiting}</h1>
        </div>
    );
}

export default Hello;