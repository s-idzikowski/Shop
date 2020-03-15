import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { GreeterClient } from './../../gRPC/GreetServiceClientPb';

import { Hello } from './components/Hello';

const greeterClient: GreeterClient = new GreeterClient('https://localhost:5001');

interface IProps {

}

interface IState {

}

export class App extends React.Component<IProps, IState> {
    state: IState = {

    };

    constructor(props: IProps) {
        super(props);


    }

    render() {
        return (
            <div>
                <h1>Witaj moj swiecie!</h1>
                <Hello greeterClient={greeterClient} />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));