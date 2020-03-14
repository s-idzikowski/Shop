import * as React from 'react';

declare var require: any

import { GreeterClient } from './../../../gRPC/GreetServiceClientPb';
import { HelloRequest, HelloReply } from './../../../gRPC/greet_pb';

var request = new HelloRequest();
request.setName('Hello Slaw!');

interface IProps {
    greeterClient: GreeterClient;
}

export class Hello extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);


const { HelloRequest, HelloReply } = require('./../../../gRPC/greet_pb.js');
const { GreeterClient } = require('./../../../gRPC/greet_grpc_web_pb.js');

var client = new GreeterClient('https://localhost:5001');
var request = new HelloRequest();
request.setName('Hello Slaw!');

        props.greeterClient.sayHello(request, {}, (err: any, response: { getMessage: () => any; }) => {
            console.log(response.getMessage());
        });
    };
    
    render() {

        return <h1>This is a {this.props.greeterClient}</h1>
    }
}