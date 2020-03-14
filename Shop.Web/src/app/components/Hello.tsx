import * as React from 'react';

declare var require: any

const { GreeterClient } = require('./../../../../gRPC/greet_grpc_web_pb.js');
const { HelloRequest, HelloReply } = require('./../../../gRPC/greet_pb.js');

var request = new HelloRequest();
request.setName('Hello Slaw!');

interface IProps {
    greeterClient: GreeterClient;
}

export class Hello extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);

        this.state = {

        }

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