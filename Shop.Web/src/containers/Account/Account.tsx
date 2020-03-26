import * as React from 'react';

import './Account.css';
import { UserData, UserRequest, UserResponse, StatusCode, Operations, OperationTypes } from '../../../gRPC/service_pb';
import { Redirect, BrowserRouter, Link, Switch, Route } from 'react-router-dom';
import Client from '../../class/Client';
import UserLogged from './UserLogged';
import Loading from '../../components/Loading/Loading';
import ServiceError from '../../components/ServiceError/ServiceError';
import NotFound from '../../components/NotFound/NotFound';
import NavbarLink from '../../components/Navbar/NavbarLink';
import PageTitle from '../../components/PageTitle/PageTitle';

interface IProps {

}

interface IState {
    user: UserData.AsObject,
    error: boolean,
    operations: any
}

class Account extends React.Component<IProps, IState> {
    state: IState = {
        user: JSON.parse(window.sessionStorage.getItem("user")),
        error: false,
        operations: null
    };

    constructor(props: IProps) {
        super(props);

        if (!Client.GetUser()) {
            Client.Redirect();
        }
    }

    logHandler() {
        const request: UserRequest = new UserRequest();
        request.setUserid(this.state.user.userid);
        Client.Instance().getUserOperations(request, Client.Header(), (err: any, response: Operations) => {
            Client.CheckError(err, () => {
                this.setState({
                    operations : response.getUseroperationList()

                    //todo
                })
                
            }, () => {
                this.setState({
                    error: true
                });
            });
        });
    }

    render() {
        const userLogged = () => <UserLogged user={this.state.user} />;
        const loading = () => <Loading />;
        const serviceError = () => <ServiceError />;

        const isLoading = () => this.state.user;
        const isError = () => this.state.error;

        return (
            <div>
                <PageTitle title="Moje konto" />

                <div className="row">
                    <BrowserRouter>
                        <div className="col-4">
                            <div className="shadow p-2 m-2">
                                <ul className="nav flex-column">
                                    <NavbarLink to="/Account" displayName="Moje dane" />
                                    <NavbarLink to="/Account/changepassword" displayName="Zmień hasło" />
                                    <NavbarLink onClick={this.logHandler.bind(this)} to="/Account/log" displayName="Dziennik aktywności" />
                                    <NavbarLink to="/Account/settings" displayName="Ustawienia" />
                                </ul>
                            </div>
                        </div>

                        <div className="col-8">
                            <div className="shadow p-2 m-2">
                                <Switch>
                                    <Route exact path='/Account'>
                                        {isError() ? serviceError() : (isLoading() ? userLogged() : loading())}
                                    </Route>

                                    <Route path='/Account/changepassword'>
                                        Zmiana hasła
                                    </Route>

                                    <Route path='/Account/log'>
                                        Dziennik aktywności
                                       
                                    </Route>

                                    <Route path='/Account/settings'>
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