import * as React from 'react';

import { GreeterClient } from './../../../gRPC/GreetServiceClientPb';
import { HelloRequest, HelloReply } from './../../../gRPC/greet_pb';

interface IProps {
    greeterClient: GreeterClient;
}

interface IState {
    helloReply: HelloReply;
}

export class Hello extends React.Component<IProps, IState> {
    state: IState = {
        helloReply: null
    };

    constructor(props: IProps) {
        super(props);

        const request: HelloRequest = new HelloRequest();
        request.setName('Hello Slaw!');

        props.greeterClient.sayHello(request, {}, (err: any, response: HelloReply) => {
            console.log(response.getMessage());

            this.setState({
                helloReply: response
            });
        });
    };

    render() {
        //const response = () => "Response: " + this.state.helloReply.getMessage();
        //const waiting = () => "Waiting for response...";

        return (
            <div>
                <h1>{this.state.helloReply ? "Response: " + this.state.helloReply.getMessage() : "Waiting for response..."}</h1>
            </div>
        );
    }
}