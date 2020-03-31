import * as React from 'react';

import './Account.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import AccountInformation from './AccountInformation/AccountInformation';
import NotFound from '../../components/NotFound/NotFound';
import PageTitle from '../../components/PageTitle/PageTitle';
import AccountOperations from './Operations/AccountOperations';
import AccountChangePassword from './ChangePassword/AccountChangePassword';
import AccountAddress from './Address/AccountAddress';
import AccountNavbar from './AccountNavbar';

class Account extends React.Component {
    render(): JSX.Element {
        return (
            <div>
                <PageTitle title="Moje konto" />

                <div className="row">
                    <BrowserRouter>
                        <div className="col-4">
                            <AccountNavbar />
                        </div>

                        <div className="col-8">
                            <div className="shadow p-2 m-2">
                                <Switch>
                                    <Route exact path='/account'>
                                        <Redirect to='/account/information' />
                                    </Route>

                                    <Route path='/account/information'>
                                        <AccountInformation />
                                    </Route>

                                    <Route path='/account/address'>
                                        <AccountAddress />
                                    </Route>

                                    <Route path='/account/changepassword'>
                                        <AccountChangePassword />
                                    </Route>

                                    <Route path='/account/log'>
                                        <AccountOperations />
                                    </Route>

                                    <Route path='/account/settings'>
                                        Ustawienia
                                    </Route>

                                    <Route component={NotFound} />
                                </Switch>
                            </div>
                        </div>
                    </BrowserRouter>
                </div>
            </div>
        );
    }
}

export default Account;