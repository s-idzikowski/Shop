import * as React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

import './App.css';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Dashboard from '../../components/Dashboard/Dashboard';
import Hello from '../../components/Hello';
import Test from '../../components/Test/Test';

interface IState {

}

export class App extends React.Component {
    state: IState = {

    };

    render() {

        const tempHello = [];

        for (var i = 0; i < 1; i++) {
            tempHello.push(<Hello key={i} />)
        }

        return (
            <div className="d-flex flex-column">

                <BrowserRouter>

                    <Header />

                    <Switch>
                        <Route exact path='/'>
                            <Dashboard />
                        </Route>
                        <Route path='/test'>
                            <Test />
                        </Route>
                    </Switch>

                    {tempHello}
                </BrowserRouter>

                <Footer />
            </div>
        );
    }
}

export default App;