import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { GreeterClient } from './../../gRPC/GreetServiceClientPb';

import { Hello } from './components/Hello';

const greeterClient = new GreeterClient('https://localhost:5001');

export class App extends React.Component {
    constructor() {
        super({});
    }

    render() {
        return (
            <div>
                <h1>Witaj moj swiecie!</h1>
                <Hello greeterClient={greeterClient}/>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));