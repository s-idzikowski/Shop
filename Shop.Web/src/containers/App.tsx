import * as React from 'react';

import './App.css';

import { GreeterClient } from '../../gRPC/GreetServiceClientPb';

import Hello from '../components/Hello';
import WebLogo from '../components/Logo/WebLogo';
import WebFooter from '../components/Footer/WebFooter';
import WebBody from '../components/Body/WebBody';

const greeterClient: GreeterClient = new GreeterClient('https://localhost:5001');

interface IState {

}

export class App extends React.Component {
    state: IState = {

    };

    constructor() {
        super({});


    }

    render() {
        return (
            <div>
                <WebLogo />
                <WebBody />
                <WebFooter />
            </div>
        );
    }
}

export default App;