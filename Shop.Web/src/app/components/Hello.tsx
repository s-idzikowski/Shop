import * as React from 'react';
import * as grpcWeb from "grpc-web";

import { GreeterClient } from './../../../gRPC/GreetServiceClientPb';
import { HelloRequest, HelloReply } from './../../../gRPC/greet_pb';

interface IProps {
    compiler: string,
    framework: string,
    bundler: string
}

declare var require: any

//const { HelloRequest, HelloReply } = require('./../../../gRPC/greet_pb.d');
//const { GreeterClient } = require('./../../../gRPC/GreetServiceClientPb');

const client = new GreeterClient('https://localhost:5001', null, null);

const request = new HelloRequest();
request.setName('Siema Slaw!');


client.sayHello(request, {}, (err: any, response: { getMessage: () => any; }) => {
    console.log(response.getMessage());
});

export class Hello extends React.Component<IProps, {}> {
    render() {
        return <h1>This is a {this.props.framework} application using    {this.props.compiler} with {this.props.bundler} </h1>
    }
}