import * as React from 'react';

import './SignIn.css';
import { Label, Input, Button } from 'reactstrap';
import { SignInRequest, SignInData, SignInResponse, StatusCode, UserData } from '../../../gRPC/service_pb';
import Client from '../../class/Client';

import { toast } from 'react-toastify';
import { Redirect } from 'react-router-dom';

interface IProps {
    onSignIn: () => void,
}

interface IState {
    username: string,
    password: string,
    redirect: boolean,
}

class SignIn extends React.Component<IProps, IState> {
    state: IState = {
        username: "",
        password: "",
        redirect: false,
    };

    constructor(props: IProps) {
        super(props);

        if (Client.GetUser()) {
            this.state = {
                username: "",
                password: "",
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

    clearState() {
        this.setState({
            username: "",
            password: ""
        });
    }

    signInHandler = () => {
        const signInData: SignInData = new SignInData();
        signInData.setUsername(this.state.username);
        signInData.setPassword(Client.HashSensitiveData(this.state.password));

        const request: SignInRequest = new SignInRequest();
        request.setSignindata(signInData);

        Client.Instance().userSignIn(request, Client.Header(), (err: any, response: SignInResponse) => {
            Client.CheckError(err, () => {
                switch (response.getStatuscode()) {
                    case StatusCode.OK:

                        const user = response.getUserdata();
                        window.sessionStorage.setItem("auth-token", user.getAuthkey());
                        window.sessionStorage.setItem("user", JSON.stringify(user.toObject()));

                        toast.success("Poprawne logowanie.");

                        this.props.onSignIn();

                        this.setState({
                            redirect: true
                        });

                        break;
                    case StatusCode.SIGNIN_NOT_FOUND:

                        this.clearState();
                        toast.error("Nazwa użytkownika lub hasło jest niepoprawne.");

                        break;
                    case StatusCode.SIGNIN_ACCOUNT_BAN:

                        this.clearState();
                        toast.error("Twoje konto jest zawieszone.");

                        break;
                    case StatusCode.DATABASE_ERROR:

                        this.clearState();
                        toast.error("Błąd bazy danych.");

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

                    <Button onClick={this.signInHandler.bind(this)}>Zaloguj</Button>
                </form>
            </div>
        );
    }
}

export default SignIn;