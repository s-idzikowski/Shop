import * as React from 'react';

import './Register.css';
import { RegisterData, RegisterRequest, BasicResponse } from '../../../gRPC/service_pb';
import Client from '../../class/Client';
import { toast } from 'react-toastify';
import { Label, Input, Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import ServiceError from '../../components/ServiceError/ServiceError';
import ClientHelper from '../../class/ClientHelper';

interface IProps {
    onRegister: () => void,
}

interface IState {
    username: string,
    password: string,
    emailAddress: string,
    redirect: boolean,
    loading: boolean,
    error: boolean,
}

class Register extends React.Component<IProps, IState> {
    state: IState = {
        username: "",
        password: "",
        emailAddress: "",
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

    emailAddressChangeHandler = (e: any) => {
        this.setState({
            emailAddress: e.target.value
        });
    }

    clearState() {
        this.setState({
            username: "",
            password: "",
            emailAddress: "",
            loading: false,
            error: false,
        });
    }

    registerHandler = () => {
        if (!this.validate())
            return;

        this.setState({
            loading: true,
        });

        const registerData: RegisterData = new RegisterData();
        registerData.setUsername(this.state.username);
        registerData.setPassword(ClientHelper.HashSensitiveData(this.state.password));
        registerData.setEmailaddress(this.state.emailAddress);

        const request: RegisterRequest = new RegisterRequest();
        request.setRegisterdata(registerData);

        Client.Instance().userRegister(request, Client.Header(), (err: any, response: BasicResponse) => {
            Client.CheckError(err, () => {

                const onSuccess = () => {
                    window.sessionStorage.setItem("Authorization", response.getAuthorization());
                    toast.success("Poprawna rejestracja.");
                    this.props.onRegister();
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

        if (!ClientHelper.ValidateLength(this.state.emailAddress)) {
            status = false;
            toast.warn("Pole 'Adres e-mail' jest niepoprawne.");
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
                        <Label>Adres e-mail:</Label>
                        <Input value={this.state.emailAddress} onChange={this.emailAddressChangeHandler.bind(this)} />
                    </p>

                    <p>
                        <Button onClick={this.registerHandler.bind(this)}>Rejestruj</Button>
                    </p>
                </form>
            </div>
        );
    }
}

export default Register;