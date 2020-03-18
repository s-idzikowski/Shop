import * as React from 'react';

import './SignIn.css';
import { Label, Input, Button } from 'reactstrap';
import { SignInRequest, SignInData, SignInResponse, StatusCode } from '../../../gRPC/service_pb';
import Client from '../../class/Client';

import { toast } from 'react-toastify';

interface IState {
    username: string,
    password: string,
}

class SignIn extends React.Component {
    state: IState = {
        username: "",
        password: "",
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

    signInHandler = () => {
        const signInData: SignInData = new SignInData();
        signInData.setUsername(this.state.username);
        signInData.setPassword(this.state.password);

        const request: SignInRequest = new SignInRequest();
        request.setSignindata(signInData);

        Client.Instance().userSignIn(request, Client.Header(), (err: any, response: SignInResponse) => {
            Client.CheckError(err, () => {

                switch (response.getStatuscode()) {
                    case StatusCode.OK:

                        const user = response.getUserdata();
                        toast.success("Poprawne logowanie " + user.getUsername());
                        toast.info("Token: " + user.getAuthkey());

                        break;
                    case StatusCode.SIGNIN_NOT_FOUND:

                        toast.error("Nazwa użytkownika lub hasło jest niepoprawne.");

                        break;
                    case StatusCode.SIGNIN_ACCOUNT_BAN:

                        toast.error("Twoje konto jest zawieszone.");

                        break;
                    case StatusCode.DATABASE_ERROR:

                        toast.error("Błąd bazy danych.");

                        break;
                }
                
                this.setState({
                    username: "",
                    password: ""
                });
            })
        });
    };

    render() {
        return (
            <div>
                <form>
                    <Label>
                        Nazwa użytkownika
                    </Label>
                    <Input value={this.state.username} onChange={this.usernameChangeHandler.bind(this)} />

                    <Label>
                        Hasło
                    </Label>
                    <Input value={this.state.password} onChange={this.passwordChangeHandler.bind(this)} />

                    <Button onClick={this.signInHandler.bind(this)}>Zaloguj</Button>
                </form>
            </div>
        );
    }
}

export default SignIn;