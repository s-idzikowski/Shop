import * as React from 'react';

import './UserPanel.css';
import { UserData, UserRequest, UserResponse, StatusCode } from '../../../gRPC/service_pb';
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
    redirect: boolean
}

class UserPanel extends React.Component<IProps, IState> {
    state: IState = {
        user: null,
        error: false,
        redirect: false
    };

    constructor(props: IProps) {
        super(props);

        if (!Client.GetUser()) {
            this.state = {
                user: null,
                error: false,
                redirect: true,
            };
        }
        else {
            const request: UserRequest = new UserRequest();

            Client.Instance().getUser(request, Client.Header(), (err: any, response: UserResponse) => {
                Client.CheckError(err, () => {
                    switch (response.getStatuscode()) {
                        case StatusCode.OK:

                            const user = response.getUserdata();
                            window.sessionStorage.setItem("user", JSON.stringify(user.toObject()));

                            this.setState({
                                user: user.toObject()
                            });

                            break;
                        case StatusCode.UNATHORIZED:

                            window.sessionStorage.clear();
                            this.setState({
                                redirect: true
                            });

                            break;
                    }
                }, () => {
                    this.setState({
                        error: true
                    });
                });
            });
        }
    }

    render() {
        const userLogged = () => <UserLogged user={this.state.user} />;
        const loading = () => <Loading />;
        const serviceError = () => <ServiceError />;

        const isLoading = () => this.state.user;
        const isError = () => this.state.error;

        return (
            <div>
                {this.state.redirect ? <Redirect to='/' /> : ""}

                <PageTitle title="Panel użytkownika"/>

                <div className="row">
                    <BrowserRouter>
                        <div className="col-4">
                            <div className="shadow p-2 m-2">
                                <ul className="nav flex-column">
                                    <NavbarLink to="/userpanel" displayName="Moje dane" />
                                    <NavbarLink to="/userpanel/changepassword" displayName="Zmień hasło" />
                                    <NavbarLink to="/userpanel/log" displayName="Dziennik aktywności" />
                                </ul>
                            </div>
                        </div>

                        <div className="col-8">
                            <div className="shadow p-2 m-2">
                                <Switch>
                                    <Route exact path='/userpanel'>
                                        <h2>{isError() ? serviceError() : (isLoading() ? userLogged() : loading())}</h2>
                                    </Route>

                                    <Route path='/userpanel/changepassword'>
                                        Zmiana hasła
                                    </Route>

                                    <Route path='/userpanel/log'>
                                        Dziennik aktywności
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

export default UserPanel;