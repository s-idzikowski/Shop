import * as React from "react";

declare var require: any

var ReactDOM = require('react-dom');

const { GetTodoRequest } = require('./gRPC/todos_pb.js');
const { TodoServiceClient } = require('./gRPC/todos_grpc_web_pb.js');
const todoService = new proto.todos.TodoServiceClient('http://localhost:8080');

export class Hello extends React.Component {
    render() {
        return (
            <h1>Welcome to React!! aaa</h1>
        );
    }
}

ReactDOM.render(<Hello />, document.getElementById('root'));