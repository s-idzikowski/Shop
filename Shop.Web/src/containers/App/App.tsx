import * as React from 'react';

import './App.css';

import WebLogo from '../../components/Logo/WebLogo';
import WebFooter from '../../components/Footer/WebFooter';
import WebBody from '../../components/Body/WebBody';
import Hello from '../../components/Hello';

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

                <Hello />
            </div>
        );
    }
}

export default App;