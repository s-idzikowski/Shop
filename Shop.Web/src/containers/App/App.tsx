import * as React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

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

class App extends React.Component {
    render() {
        const Update = () => this.forceUpdate();

        return (
            <div className="d-flex flex-column">
                <ToastContainer />

                <BrowserRouter>

                    <Header />

                    <div className="container">
                        <Switch>
                            <Route exact path='/' component={Dashboard} />

                            <Route path='/signin'>
                                <SignIn onSignIn={Update} />
                            </Route>
                            <Route path='/register'>
                                <Register onRegister={Update} />
                            </Route>
                            <Route path='/logout'>
                                <Logout onLogout={Update} />
                            </Route>
                            <Route path='/account' component={Account} />

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