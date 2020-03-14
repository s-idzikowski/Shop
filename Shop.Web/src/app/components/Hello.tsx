import * as React from 'react';

import { GreeterClient } from './../../../gRPC/GreetServiceClientPb';
import { HelloRequest, HelloReply } from './../../../gRPC/greet_pb';

interface IProps {
    greeterClient: GreeterClient;
}

interface IState {
    helloReply?: HelloReply;
}

export class Hello extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            helloReply: null
        };

        var request = new HelloRequest();
        request.setName('Hello Slaw!');

        props.greeterClient.sayHello(request, {}, (err: any, response: HelloReply) => {
            console.log(response.getMessage());

            this.setState({
                helloReply: response
            });
        });
    };

    render() {
        return <h1>This is a {this.state.helloReply?.getMessage()}</h1>
    }
}