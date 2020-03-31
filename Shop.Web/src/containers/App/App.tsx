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
import AnonymouseRoute from '../../class/AnonymouseRoute';

class App extends React.Component {
    render(): JSX.Element {
        return (
            <div className="d-flex flex-column">
                <ToastContainer />

                <BrowserRouter>

                    <Header />

                    <div className="container">
                        <Switch>
                            <Route exact path='/' component={Dashboard} />

                            <AnonymouseRoute path='/signin' component={SignIn} />

                            <AnonymouseRoute path='/register' component={Register} />

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