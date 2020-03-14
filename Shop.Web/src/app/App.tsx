import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Hello } from './components/Hello';

declare var require: any

const { GreeterClient } = require('./../../../gRPC/greet_grpc_web_pb.js');
//const { HelloRequest, HelloReply } = require('./../../../gRPC/greet_pb.js');

const greeterClient = new GreeterClient('https://localhost:5001');

export class App extends React.Component {
    constructor() {
        super({});
    }

    render() {
        return (
            <div>
                <h1>Helo³ maj ³ord!</h1>
                <Hello greeterClient={greeterClient}/>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));