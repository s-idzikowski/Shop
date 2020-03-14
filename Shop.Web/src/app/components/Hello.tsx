import * as React from 'react';
import * as grpcWeb from "grpc-web";

interface IProps {
    compiler: string,
    framework: string,
    bundler: string
}

declare var require: any


const { HelloRequest, HelloReply } = require('./../../../gRPC/greet_pb.js');
const { GreeterClient } = require('./../../../gRPC/greet_grpc_web_pb.js');

var client = new GreeterClient('https://localhost:5001');
var request = new HelloRequest();
request.setName('Hello Slaw!');

client.sayHello(request, {}, (err: any, response: { getMessage: () => any; }) => {
    console.log(response.getMessage());
});

export class Hello extends React.Component<IProps, {}> {
    render() {
        return <h1>This is a {this.props.framework} application using    {this.props.compiler} with {this.props.bundler} </h1>
    }
}