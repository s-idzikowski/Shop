import * as React from 'react';

import './../Account.css';
import { Label, Input, Button } from 'reactstrap';
import Client from '../../../class/Client';
import { ChangePasswordRequest, BasicResponse } from '../../../../gRPC/service_pb';
import { toast } from 'react-toastify';
import Loading from '../../../components/Loading/Loading';
import ClientHelper from '../../../class/ClientHelper';

interface IProps {

}

interface IState {
    oldPassword: string,
    newPassword: string,
    newPassword2: string,
    loading: boolean
}

class AccountChangePassword extends React.Component<IProps, IState> {

    state: IState = {
        oldPassword: "",
        newPassword: "",
        newPassword2: "",
        loading: false,
    };

    oldPasswordChangeHandler = (e: any) => {
        this.setState({
            oldPassword: e.target.value
        });
    }

    newPasswordChangeHandler = (e: any) => {
        this.setState({
            newPassword: e.target.value
        });
    }

    newPassword2ChangeHandler = (e: any) => {
        this.setState({
            newPassword2: e.target.value
        });
    }

    clearState = () => {
        this.setState({
            oldPassword: "",
            newPassword: "",
            newPassword2: "",
            loading: false,
        });
    };

    changePasswordHandler = () => {
        if (!this.validatePassword())
            return;

        this.setState({
            loading: true,
        });

        const changePasswordRequest: ChangePasswordRequest = new ChangePasswordRequest();
        changePasswordRequest.setOldpassword(ClientHelper.HashSensitiveData(this.state.oldPassword));
        changePasswordRequest.setNewpassword(ClientHelper.HashSensitiveData(this.state.newPassword));

        Client.Instance().userChangePassword(changePasswordRequest, Client.Header(), (err: any, response: BasicResponse) => {
            Client.CheckError(err, () => {

                const onSuccess = () => {
                    window.sessionStorage.setItem("Authorization", response.getAuthorization());
                    toast.success("Hasło zostało zmienione.");

                    this.clearState();
                };

                Client.CheckStatusCode(response.getStatuscode(), this.clearState.bind(this), onSuccess, null);

            }, () => {
                this.clearState();
            });
        });
    };

    validatePassword = (): boolean => {
        var status: boolean = true;

        if (ClientHelper.ValidateLength(this.state.oldPassword)) {
            status = false;
            toast.warn("Pole 'Stare hasło' jest niepoprawne.");
        }

        if (ClientHelper.ValidateLength(this.state.newPassword)) {
            status = false;
            toast.warn("Pole 'Nowe hasło' jest niepoprawne.");
        }

        if (ClientHelper.ValidateLength(this.state.newPassword2)) {
            status = false;
            toast.warn("Pole 'Powtórz nowe hasło' jest niepoprawne.");
        }

        if (status && this.state.newPassword != this.state.newPassword2) {
            status = false;
            toast.warn("Nowe hasła różnią się od siebie.");
        }

        return status;
    }

    render() {
        if (this.state.loading) {
            return (
                <Loading />
            );
        }

        return (
            <div>
                <p>
                    <Label>Stare hasło:</Label>
                    <Input type="password" value={this.state.oldPassword} onChange={this.oldPasswordChangeHandler.bind(this)} />
                </p>

                <p>
                    <Label>Nowe hasło:</Label>
                    <Input type="password" value={this.state.newPassword} onChange={this.newPasswordChangeHandler.bind(this)} />
                </p>

                <p>
                    <Label>Powtórz nowe hasło:</Label>
                    <Input type="password" value={this.state.newPassword2} onChange={this.newPassword2ChangeHandler.bind(this)} />
                </p>

                <p>
                    <Button onClick={this.changePasswordHandler.bind(this)}>Zmień hasło</Button>
                </p>
            </div>
        );
    }
}

export default AccountChangePassword;