import * as React from 'react';
import * as grpcWeb from 'grpc-web';

import './SignIn.css';
import { Label, Input, Button } from 'reactstrap';
import { SignInRequest, SignInData, BasicResponse } from '../../../gRPC/service_pb';
import Client from '../../class/Client';

import { toast } from 'react-toastify';
import Loading from '../../components/Loading/Loading';
import ServiceError from '../../components/ServiceError/ServiceError';
import ClientHelper from '../../class/ClientHelper';
import { Redirect } from 'react-router-dom';

interface State {
    username: string;
    password: string;
    loading: boolean;
    error: boolean;
    redirect: boolean;
}

class SignIn extends React.Component<Readonly<{}>, State> {
    state: State = {
        username: "",
        password: "",
        loading: false,
        error: false,
        redirect: false,
    };

    usernameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({
            username: e.target.value
        });
    }

    passwordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({
            password: e.target.value
        });
    }

    clearState(): void {
        this.setState({
            username: "",
            password: "",
            loading: false,
            error: false,
        });
    }

    signInHandler = (): void => {
        if (!this.validate())
            return;

        this.setState({
            loading: true,
        });

        const signInData: SignInData = new SignInData();
        signInData.setUsername(this.state.username);
        signInData.setPassword(ClientHelper.HashSensitiveData(this.state.password));

        const request: SignInRequest = new SignInRequest();
        request.setSignindata(signInData);

        Client.Instance().userSignIn(request, Client.Header(), (err: grpcWeb.Error, response: BasicResponse) => {
            Client.CheckError(err, () => {

                const onSuccess = (): void => {
                    window.sessionStorage.setItem("Authorization", response.getAuthorization());
                    toast.success("Poprawne logowanie.");
                };

                const onRedirect = (): void => {
                    this.setState({
                        loading: false,
                        error: false,
                        redirect: true,
                    });
                };

                Client.CheckStatusCode(response.getStatuscode(), this.clearState.bind(this), onSuccess, onRedirect);

            }, () => {
                this.setState({
                    loading: false,
                    error: true,
                });
            });
        });
    };

    validate = (): boolean => {
        let status = true;

        if (!ClientHelper.ValidateLength(this.state.username)) {
            status = false;
            toast.warn("Pole 'Nazwa użytkownika' jest niepoprawne.");
        }

        if (!ClientHelper.ValidateLength(this.state.password)) {
            status = false;
            toast.warn("Pole 'Hasło' jest niepoprawne.");
        }

        return status;
    }

    render(): JSX.Element {
        if (this.state.loading) {
            return (
                <Loading />
            );
        } else if (this.state.error) {
            return (
                <ServiceError />
            );
        } else if (this.state.redirect) {
            return (
                <Redirect to='/' />
            );
        }

        return (
            <div>
                <form>
                    <p>
                        <Label>Nazwa użytkownika:</Label>
                        <Input value={this.state.username} onChange={this.usernameChangeHandler.bind(this)} />
                    </p>

                    <p>
                        <Label>Hasło:</Label>
                        <Input type="password" value={this.state.password} onChange={this.passwordChangeHandler.bind(this)} />
                    </p>

                    <p>
                        <Button onClick={this.signInHandler.bind(this)}>Zaloguj</Button>
                    </p>
                </form>
            </div>
        );
    }
}

export default SignIn;