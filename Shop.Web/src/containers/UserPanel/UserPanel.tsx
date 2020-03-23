import * as React from 'react';

import './UserPanel.css';
import { UserData, UserRequest, UserResponse, StatusCode } from '../../../gRPC/service_pb';
import { Redirect } from 'react-router-dom';
import Client from '../../class/Client';
import UserLogged from './UserLogged';
import Loading from '../../components/Loading/Loading';
import ServiceError from '../../components/ServiceError/ServiceError';

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

                <h1>Panel użytkownika</h1>

                <h2>{isError() ? serviceError() : (isLoading() ? userLogged() : loading())}</h2>
            </div>
        );
    }
}

export default UserPanel;