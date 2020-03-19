import * as React from 'react';

import './Register.css';
import { RegisterData, RegisterRequest, RegisterResponse, StatusCode } from '../../../gRPC/service_pb';
import Client from '../../class/Client';
import { toast } from 'react-toastify';
import { Label, Input, Button } from 'reactstrap';

interface IState {
    username: string,
    password: string,
    emailAddress: string,
}

class Register extends React.Component {
    state: IState = {
        username: "",
        password: "",
        emailAddress: "",
    };

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

    registerHandler = () => {
        const registerData: RegisterData = new RegisterData();
        registerData.setUsername(this.state.username);
        registerData.setPassword(this.state.password);
        registerData.setEmailaddress(this.state.emailAddress);

        const request: RegisterRequest = new RegisterRequest();
        request.setRegisterdata(registerData);

        Client.Instance().userRegister(request, Client.Header(), (err: any, response: RegisterResponse) => {
            Client.CheckError(err, () => {

                switch (response.getStatuscode()) {
                    case StatusCode.OK:

                        const user = response.getUserdata();
                        window.sessionStorage.setItem("auth-token", user.getAuthkey());

                        toast.success("Poprawna rejestracja " + user.getUsername());
                        toast.info("Token: " + user.getAuthkey());

                        break;
                    case StatusCode.REGISTER_PASSWORD_NOT_VALID:

                        toast.error("Podane hasło nie jest dopuszczalne.");

                        break;
                    case StatusCode.REGISTER_USERNAME_OCCUPIED:

                        toast.error("Podana nazwa użytkownika jest już zajęta.");

                        break;
                    case StatusCode.REGISTER_EMAIL_OCCUPIED:

                        toast.error("Podany adres email jest już zajęty.");

                        break;
                    case StatusCode.UNATHORIZED:

                        window.sessionStorage.clear();
                        toast.info("Błąd - wylogowano!");

                        break;
                }

                this.setState({
                    username: "",
                    password: "",
                    emailAddress: ""
                });
            })
        });
    };

    render() {
        return (
            <div>
                <form>
                    <Label>
                        Nazwa użytkownika:
                    </Label>
                    <Input value={this.state.username} onChange={this.usernameChangeHandler.bind(this)} />

                    <Label>
                        Hasło:
                    </Label>
                    <Input type="password" value={this.state.password} onChange={this.passwordChangeHandler.bind(this)} />

                    <Label>
                        Adres e-mail:
                    </Label>
                    <Input value={this.state.emailAddress} onChange={this.emailAddressChangeHandler.bind(this)} />

                    <Button onClick={this.registerHandler.bind(this)}>Rejestruj</Button>
                </form>
            </div>
        );
    }
}

export default Register;