import * as React from 'react';

import './Register.css';
import { RegisterData, RegisterRequest, BasicResponse } from '../../../gRPC/service_pb';
import Client from '../../class/Client';
import { toast } from 'react-toastify';
import { Label, Input, Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';

interface IProps {
    onRegister: () => void,
}

interface IState {
    username: string,
    password: string,
    emailAddress: string,
    redirect: boolean,
}

class Register extends React.Component<IProps, IState> {
    state: IState = {
        username: "",
        password: "",
        emailAddress: "",
        redirect: false,
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
            emailAddress: ""
        });
    }

    registerHandler = () => {
        const registerData: RegisterData = new RegisterData();
        registerData.setUsername(this.state.username);
        registerData.setPassword(Client.HashSensitiveData(this.state.password));
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
                        redirect: true
                    });
                };

                Client.CheckStatusCode(response.getStatuscode(), this.clearState.bind(this), onSuccess, onRedirect);

            })
        });
    };

    render() {
        return (
            <div>
                {this.state.redirect ? <Redirect to='/' /> : ""}

                <form>
                    <div>
                        <Label>Nazwa użytkownika:</Label>
                        <Input value={this.state.username} onChange={this.usernameChangeHandler.bind(this)} />
                    </div>

                    <div>
                        <Label>Hasło:</Label>
                        <Input type="password" value={this.state.password} onChange={this.passwordChangeHandler.bind(this)} />
                    </div>

                    <div>
                        <Label>Adres e-mail:</Label>
                        <Input value={this.state.emailAddress} onChange={this.emailAddressChangeHandler.bind(this)} />
                    </div>

                    <div>
                        <Button onClick={this.registerHandler.bind(this)}>Rejestruj</Button>
                    </div>
                </form>
            </div>
        );
    }
}

export default Register;