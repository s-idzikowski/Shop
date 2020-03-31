import * as React from 'react';
import * as grpcWeb from 'grpc-web';

import './../Account.css';
import { UserData, UserRequest, UserResponse, ChangeInformationRequest, BasicResponse } from '../../../../gRPC/service_pb';
import { Label, Input, Button } from 'reactstrap';
import Client from '../../../class/Client';
import Loading from '../../../components/Loading/Loading';
import ServiceError from '../../../components/ServiceError/ServiceError';
import ClientHelper from '../../../class/ClientHelper';
import { toast } from 'react-toastify';

interface State {
    user: UserData.AsObject;
    error: boolean;
    loading: boolean;
}

class AccountInformation extends React.Component<Readonly<{}>, State> {
    state: State = {
        user: null,
        error: false,
        loading: false,
    };

    constructor(props: Readonly<{}>) {
        super(props);

        this.downloadHandler();
    }

    downloadHandler(): void {
        Client.Instance().getUser(new UserRequest(), Client.Header(), (err: grpcWeb.Error, response: UserResponse) => {
            Client.CheckError(err, () => {

                const onSuccess = (): void => {
                    this.setState({
                        user: response.getUserdata().toObject(),
                        error: false,
                        loading: false,
                    });
                };

                const onError = (): void => {
                    this.setState({
                        error: true,
                        loading: false,
                    });
                };

                Client.CheckStatusCode(response.getStatuscode(), onError, onSuccess, null);

            }, () => {
                this.setState({
                    error: true,
                    loading: false,
                });
            });
        });
    }

    changePasswordHandler = (): void => {
        if (!this.validateInformations())
            return;

        this.setState({
            loading: true,
        });

        const changeInformationRequest: ChangeInformationRequest = new ChangeInformationRequest();
        const userData: UserData = new UserData();
        userData.setUsername(this.state.user.username);
        userData.setEmail(this.state.user.email);
        userData.setTelephone(this.state.user.telephone);
        changeInformationRequest.setUserdata(userData);

        Client.Instance().userChangeInformation(changeInformationRequest, Client.Header(), (err: grpcWeb.Error, response: BasicResponse) => {
            Client.CheckError(err, () => {

                const onSuccess = (): void => {
                    toast.success("Twoje dane zostały zmienione.");

                    this.downloadHandler();
                };

                Client.CheckStatusCode(response.getStatuscode(), this.downloadHandler.bind(this), onSuccess, null);

            }, () => {
                this.downloadHandler();
            });
        });
    };

    validateInformations = (): boolean => {
        let status = true;

        if (!ClientHelper.ValidateLength(this.state.user.username)) {
            status = false;
            toast.warn("Pole 'Nazwa użytkownika' jest niepoprawne.");
        }

        if (!ClientHelper.ValidateLength(this.state.user.email)) {
            status = false;
            toast.warn("Pole 'Adres e-mail' jest niepoprawne.");
        }

        if (!ClientHelper.ValidateLength(this.state.user.telephone, 9)) {
            status = false;
            toast.warn("Pole 'Telefon' jest niepoprawne.");
        }

        return status;
    }

    usernameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const user: UserData.AsObject = this.state.user;
        user.username = e.target.value;
        this.setState({
            user: user
        });
    }

    emailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const user: UserData.AsObject = this.state.user;
        user.email = e.target.value;
        this.setState({
            user: user
        });
    }

    telephoneChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const user: UserData.AsObject = this.state.user;
        user.telephone = e.target.value;
        this.setState({
            user: user
        });
    }

    render(): JSX.Element {
        if (this.state.error) {
            return <ServiceError />
        }
        else if (this.state.user == null || this.state.loading) {
            return <Loading />
        }

        return (
            <div>
                <p>
                    <Label>Nazwa użytkownika:</Label>
                    <Input value={this.state.user.username} onChange={this.usernameChangeHandler.bind(this)} />
                </p>

                <p>
                    <Label>Adres e-mail:</Label>
                    <Input value={this.state.user.email} onChange={this.emailChangeHandler.bind(this)} />
                </p>

                <p>
                    <Label>Telefon:</Label>
                    <Input value={this.state.user.telephone} onChange={this.telephoneChangeHandler.bind(this)} />
                </p>

                <p>
                    <Button onClick={this.changePasswordHandler.bind(this)}>Zmień moje dane</Button>
                </p>
            </div>
        );
    }
}

export default AccountInformation;