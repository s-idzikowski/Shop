import * as React from 'react';

import './Register.css';
import { RegisterData, RegisterRequest, RegisterResponse, StatusCode, UserData } from '../../../gRPC/service_pb';
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

        if (Client.GetUser()) {
            this.state = {
                username: "",
                password: "",
                emailAddress: "",
                redirect: true,
            };
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

        Client.Instance().userRegister(request, Client.Header(), (err: any, response: RegisterResponse) => {
            Client.CheckError(err, () => {
                switch (response.getStatuscode()) {
                    case StatusCode.OK:

                        const user = response.getUserdata();
                        window.sessionStorage.setItem("auth-token", user.getAuthkey());
                        window.sessionStorage.setItem("user", JSON.stringify(user.toObject()));

                        toast.success("Poprawna rejestracja.");

                        this.props.onRegister();

                        this.setState({
                            redirect: true
                        });

                        break;
                    case StatusCode.REGISTER_PASSWORD_NOT_VALID:

                        this.clearState();
                        toast.error("Podane hasło nie jest dopuszczalne.");

                        break;
                    case StatusCode.REGISTER_USERNAME_OCCUPIED:

                        this.clearState();
                        toast.error("Podana nazwa użytkownika jest już zajęta.");

                        break;
                    case StatusCode.REGISTER_EMAIL_OCCUPIED:

                        this.clearState();
                        toast.error("Podany adres email jest już zajęty.");

                        break;
                    case StatusCode.UNATHORIZED:

                        window.sessionStorage.clear();
                        toast.info("Błąd - wylogowano!");

                        this.setState({
                            redirect: true
                        });

                        break;
                }
            })
        });
    };

    render() {
        return (
            <div>
                {this.state.redirect ? <Redirect to='/' /> : ""}

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