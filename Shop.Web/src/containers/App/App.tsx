import * as React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

import './App.css';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Dashboard from '../../components/Dashboard/Dashboard';
import Test from '../Test/Test';

interface IState {

}

export class App extends React.Component {
    state: IState = {

    };

    render() {
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

                </BrowserRouter>

                <Footer />
            </div>
        );
    }
}

export default App;