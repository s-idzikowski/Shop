import * as React from 'react';

import './Account.css';
import { UserData, UserRequest, UserResponse, UserOperationsResponse, OperationData } from '../../../gRPC/service_pb';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Client from '../../class/Client';
import AccountData from './Data/AccountData';
import Loading from '../../components/Loading/Loading';
import ServiceError from '../../components/ServiceError/ServiceError';
import NotFound from '../../components/NotFound/NotFound';
import NavbarLink from '../../components/Navbar/NavbarLink';
import PageTitle from '../../components/PageTitle/PageTitle';
import AccountOperations from './Operations/AccountOperations';
import AccountChangePassword from './ChangePassword/AccountChangePassword';
import AccountAddress from './Address/AccountAddress';

interface IProps {

}

interface IState {
    user: UserData.AsObject,
    userError: boolean,

    operations: Array<OperationData.AsObject>,
    operationsError: boolean,
}

class Account extends React.Component<IProps, IState> {
    state: IState = {
        user: null,
        userError: false,

        operations: null,
        operationsError: false,
    };

    constructor(props: IProps) {
        super(props);

        if (!Client.IsLogged()) {
            Client.Redirect();
        } else {
            if (window.location.pathname == "/account")
                this.accountHandler();
            else if (window.location.pathname == "/account/log")
                this.operationsHandler();
        }
    }

    accountHandler() {
        if (this.state.user)
            return;

        Client.Instance().getUser(new UserRequest(), Client.Header(), (err: any, response: UserResponse) => {
            Client.CheckError(err, () => {

                const onSuccess = () => {
                    this.setState({
                        user: response.getUserdata().toObject(),
                        userError: false,
                    });
                };

                const onError = () => {
                    this.setState({
                        userError: true
                    });
                };

                Client.CheckStatusCode(response.getStatuscode(), onError, onSuccess, null);

            }, () => {
                this.setState({
                    userError: true
                });
            });
        });
    }

    operationsHandler() {
        if (this.state.operations)
            return;

        Client.Instance().getUserOperations(new UserRequest(), Client.Header(), (err: any, response: UserOperationsResponse) => {
            Client.CheckError(err, () => {

                const onSuccess = () => {
                    this.setState({
                        operations: response.getOperationdataList().map((value, index) => value.toObject()),
                        operationsError: false,
                    });
                };

                const onError = () => {
                    this.setState({
                        operationsError: true
                    });
                };

                Client.CheckStatusCode(response.getStatuscode(), onError, onSuccess, null);

            }, () => {
                this.setState({
                    operationsError: true
                });
            });
        });
    }

    render() {
        const loading = () => <Loading />;
        const serviceError = () => <ServiceError />;

        const userAccount = () => <AccountData user={this.state.user} />;
        const userLoading = () => this.state.user;
        const userError = () => this.state.userError;

        const operations = () => <AccountOperations operations={this.state.operations} />;
        const operationsLoading = () => this.state.operations;
        const operationsError = () => this.state.operationsError;

        return (
            <div>
                <PageTitle title="Moje konto" />

                <div className="row">
                    <BrowserRouter>
                        <div className="col-4">
                            <div className="shadow p-2 m-2">
                                <ul className="nav flex-column">
                                    <NavbarLink onClick={this.accountHandler.bind(this)} to="/account" displayName="Moje dane" />
                                    <NavbarLink to="/account/address" displayName="Moje adresy" />
                                    <NavbarLink to="/account/changepassword" displayName="Zmień hasło" />
                                    <NavbarLink onClick={this.operationsHandler.bind(this)} to="/account/log" displayName="Dziennik aktywności" />
                                    <NavbarLink to="/account/settings" displayName="Ustawienia" />
                                </ul>
                            </div>
                        </div>

                        <div className="col-8">
                            <div className="shadow p-2 m-2">
                                <Switch>
                                    <Route exact path='/account'>
                                        {userError() ? serviceError() : (userLoading() ? userAccount() : loading())}
                                    </Route>

                                    <Route path='/account/address'>
                                        <AccountAddress />
                                    </Route>

                                    <Route path='/account/changepassword'>
                                        <AccountChangePassword />
                                    </Route>

                                    <Route path='/account/log'>
                                        {operationsError() ? serviceError() : (operationsLoading() ? operations() : loading())}
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