import * as React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Dashboard from '../../components/Dashboard/Dashboard';
import Test from '../../TEST/containers/Test/Test';
import SignIn from '../../components/SignIn/SignIn';
import Register from '../../components/Register/Register';
import NotFound from '../../components/NotFound/NotFound';

class App extends React.Component {
    render() {
        const NotFoundRedirect = () => <Redirect to='/notfound' />

        return (
            <div className="d-flex flex-column">
                <ToastContainer />

                <BrowserRouter>

                    <Header />

                    <Switch>
                        <Route exact path='/' component={Dashboard} />
                        <Route path='/signin' component={SignIn} />
                        <Route path='/register' component={Register} />

                        <Route path='/test' component={Test} />

                        <Route path='/notfound' component={NotFound} />
                        <Route component={NotFoundRedirect} />
                    </Switch>

                </BrowserRouter>

                <Footer />
            </div>
        );
    }
}

export default App;