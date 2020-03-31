import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Dashboard from '../../components/Dashboard/Dashboard';
import SignIn from '../SignIn/SignIn';
import Register from '../Register/Register';
import NotFound from '../../components/NotFound/NotFound';
import Logout from '../../components/Logout/Logout';
import Account from '../Account/Account';
import PrivateRoute from '../../class/PrivateRoute';
import Unathorized from '../../components/Unathorized/Unathorized';

class App extends React.Component {
    onUpdate = (): void => this.forceUpdate();

    render(): JSX.Element {
        return (
            <div className="d-flex flex-column">
                <ToastContainer />

                <BrowserRouter>

                    <Header />

                    <div className="container">
                        <Switch>
                            <Route exact path='/' component={Dashboard} />

                            <Route path='/signin'>
                                <SignIn onSignIn={this.onUpdate} />
                            </Route>

                            <Route path='/register'>
                                <Register onRegister={this.onUpdate} />
                            </Route>

                            <PrivateRoute path='/logout' component={Logout} />

                            <PrivateRoute path='/account' component={Account} />

                            <Route path='/unathorized' component={Unathorized} />

                            <Route component={NotFound} />
                        </Switch>
                    </div>

                </BrowserRouter>

                <Footer />
            </div>
        );
    }
}

export default App;