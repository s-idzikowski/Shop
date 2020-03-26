import * as React from 'react';

import './SignIn.css';
import { Label, Input, Button } from 'reactstrap';
import { SignInRequest, SignInData, BasicResponse } from '../../../gRPC/service_pb';
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
            password: ""
        });
    }

    signInHandler = () => {
        const signInData: SignInData = new SignInData();
        signInData.setUsername(this.state.username);
        signInData.setPassword(Client.HashSensitiveData(this.state.password));

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
                        <Button onClick={this.signInHandler.bind(this)}>Zaloguj</Button>
                    </div>
                </form>
            </div>
        );
    }
}

export default SignIn;