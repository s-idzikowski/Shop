import * as React from 'react';

import './SignIn.css';
import { Label, Input, Button } from 'reactstrap';
import { SignInRequest, SignInData, BasicResponse } from '../../../gRPC/service_pb';
import Client from '../../class/Client';

import { toast } from 'react-toastify';
import { Redirect } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import ServiceError from '../../components/ServiceError/ServiceError';
import ClientHelper from '../../class/ClientHelper';

interface IProps {
    onSignIn: () => void,
}

interface IState {
    username: string,
    password: string,
    redirect: boolean,
    loading: boolean,
    error: boolean,
}

class SignIn extends React.Component<IProps, IState> {
    state: IState = {
        username: "",
        password: "",
        redirect: false,
        loading: false,
        error: false,
    };

    constructor(props: IProps) {
        super(props);

        if (Client.IsLogged()) {
            Client.Redirect();
        }
    }

    usernameChangeHandler = (e: any) => {
        this.setState({
            username: e.target.value
        });
    }

    passwordChangeHandler = (e: any) => {
        this.setState({
            password: e.target.value
        });
    }

    clearState() {
        this.setState({
            username: "",
            password: "",
            loading: false,
            error: false,
        });
    }

    signInHandler = () => {
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

        Client.Instance().userSignIn(request, Client.Header(), (err: any, response: BasicResponse) => {
            Client.CheckError(err, () => {

                const onSuccess = () => {
                    window.sessionStorage.setItem("Authorization", response.getAuthorization());
                    toast.success("Poprawne logowanie.");
                    this.props.onSignIn();
                };

                const onRedirect = () => {
                    this.setState({
                        loading: false,
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
        var status: boolean = true;

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

    render() {
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