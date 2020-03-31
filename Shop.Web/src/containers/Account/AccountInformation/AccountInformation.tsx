import * as React from 'react';
import * as grpcWeb from 'grpc-web';

import './../Account.css';
import { UserData, UserRequest, UserResponse } from '../../../../gRPC/service_pb';
import { Label, Input } from 'reactstrap';
import Client from '../../../class/Client';
import Loading from '../../../components/Loading/Loading';
import ServiceError from '../../../components/ServiceError/ServiceError';

interface State {
    user: UserData.AsObject;
    error: boolean;
}

class AccountInformation extends React.Component<Readonly<{}>, State> {
    state: State = {
        user: null,
        error: false,
    };

    constructor(props: Readonly<{}>) {
        super(props);

        this.handler();
    }

    handler(): void {
        if (this.state.user)
            return;

        Client.Instance().getUser(new UserRequest(), Client.Header(), (err: grpcWeb.Error, response: UserResponse) => {
            Client.CheckError(err, () => {

                const onSuccess = (): void => {
                    this.setState({
                        user: response.getUserdata().toObject(),
                        error: false,
                    });
                };

                const onError = (): void => {
                    this.setState({
                        error: true
                    });
                };

                Client.CheckStatusCode(response.getStatuscode(), onError, onSuccess, null);

            }, () => {
                this.setState({
                    error: true
                });
            });
        });
    }

    render(): JSX.Element {
        if (this.state.error) {
            return <ServiceError />
        }
        else if (this.state.user == null) {
            return <Loading />
        }

        return (
            <div>
                <p>
                    <Label>Nazwa użytkownika:</Label>
                    <Input readOnly value={this.state.user.username} />
                </p>

                <p>
                    <Label>Adres e-mail:</Label>
                    <Input readOnly value={this.state.user.email} />
                </p>

                <p>
                    <Label>Telefon:</Label>
                    <Input readOnly value={this.state.user.telephone} />
                </p>
            </div>
        );
    }
}

export default AccountInformation;