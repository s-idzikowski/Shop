import * as React from 'react';
import * as grpcWeb from 'grpc-web';

import './Account.css';
import { UserData, UserRequest, UserResponse, UserOperationsResponse, OperationData, AddressData, UserAddressesResponse } from '../../../gRPC/service_pb';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Client from '../../class/Client';
import AccountData from './Data/AccountData';
import Loading from '../../components/Loading/Loading';
import ServiceError from '../../components/ServiceError/ServiceError';
import NotFound from '../../components/NotFound/NotFound';
import PageTitle from '../../components/PageTitle/PageTitle';
import AccountOperations from './Operations/AccountOperations';
import AccountChangePassword from './ChangePassword/AccountChangePassword';
import AccountAddress from './Address/AccountAddress';
import AccountNavbar from './AccountNavbar';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {

}

interface State {
    user: UserData.AsObject;
    userError: boolean;

    operations: Array<OperationData.AsObject>;
    operationsError: boolean;

    addresses: Array<AddressData.AsObject>;
    addressesError: boolean;
}

class Account extends React.Component<Props, State> {
    state: State = {
        user: null,
        userError: false,

        operations: null,
        operationsError: false,

        addresses: null,
        addressesError: false,
    };

    constructor(props: Props) {
        super(props);

        if (!Client.IsLogged()) {
            Client.Redirect();
        } else {
            if (window.location.pathname == "/account")
                this.accountHandler();
            else if (window.location.pathname == "/account/log")
                this.operationsHandler();
            else if (window.location.pathname == "/account/address")
                this.addressesHandler();
        }
    }

    accountHandler(): void {
        if (this.state.user)
            return;

        Client.Instance().getUser(new UserRequest(), Client.Header(), (err: grpcWeb.Error, response: UserResponse) => {
            Client.CheckError(err, () => {

                const onSuccess = (): void => {
                    this.setState({
                        user: response.getUserdata().toObject(),
                        userError: false,
                    });
                };

                const onError = (): void => {
                    this.setState({
                        userError: true
                    });
                };

                Client.CheckStatusCode(response.getStatuscode(), onError, onSuccess, null);

            }, () => {
                this.setState({
                    userError: true
                });
            });
        });
    }

    operationsHandler(): void {
        if (this.state.operations)
            return;

        Client.Instance().getUserOperations(new UserRequest(), Client.Header(), (err: grpcWeb.Error, response: UserOperationsResponse) => {
            Client.CheckError(err, () => {

                const onSuccess = (): void => {
                    this.setState({
                        operations: response.getOperationdataList().map((value) => value.toObject()),
                        operationsError: false,
                    });
                };

                const onError = (): void => {
                    this.setState({
                        operationsError: true
                    });
                };

                Client.CheckStatusCode(response.getStatuscode(), onError, onSuccess, null);

            }, () => {
                this.setState({
                    operationsError: true
                });
            });
        });
    }

    addressesHandler(): void {
        if (this.state.operations)
            return;

        Client.Instance().getUserAddresses(new UserRequest(), Client.Header(), (err: grpcWeb.Error, response: UserAddressesResponse) => {
            Client.CheckError(err, () => {

                const onSuccess = (): void => {
                    this.setState({
                        addresses: response.getAddressdataList().map((value) => value.toObject()),
                        addressesError: false,
                    });
                };

                const onError = (): void => {
                    this.setState({
                        addressesError: true
                    });
                };

                Client.CheckStatusCode(response.getStatuscode(), onError, onSuccess, null);

            }, () => {
                this.setState({
                    addressesError: true
                });
            });
        });
    }

    render(): JSX.Element {
        const loading = (): JSX.Element => <Loading />;
        const serviceError = (): JSX.Element => <ServiceError />;

        const userAccount = (): JSX.Element => <AccountData user={this.state.user} />;
        const userLoading = (): UserData.AsObject => this.state.user;
        const userError = (): boolean => this.state.userError;

        const operations = (): JSX.Element => <AccountOperations operations={this.state.operations} />;
        const operationsLoading = (): OperationData.AsObject[] => this.state.operations;
        const operationsError = (): boolean => this.state.operationsError;

        const addresses = (): JSX.Element => <AccountAddress addresses={this.state.addresses} />;
        const addressesLoading = (): AddressData.AsObject[] => this.state.addresses;
        const addressesError = (): boolean => this.state.addressesError;

        return (
            <div>
                <PageTitle title="Moje konto" />

                <div className="row">
                    <BrowserRouter>
                        <div className="col-4">
                            <AccountNavbar accountHandler={this.accountHandler.bind(this)} operationsHandler={this.operationsHandler.bind(this)} addressesHandler={this.addressesHandler.bind(this)} />
                        </div>

                        <div className="col-8">
                            <div className="shadow p-2 m-2">
                                <Switch>
                                    <Route exact path='/account'>
                                        {userError() ? serviceError() : (userLoading() ? userAccount() : loading())}
                                    </Route>

                                    <Route path='/account/address'>
                                        {addressesError() ? serviceError() : (addressesLoading() ? addresses() : loading())}
                                    </Route>

                                    <Route path='/account/changepassword'>
                                        <AccountChangePassword />
                                    </Route>

                                    <Route path='/account/log'>
                                        {operationsError() ? serviceError() : (operationsLoading() ? operations() : loading())}
                                    </Route>

                                    <Route path='/account/settings'>
                                        Ustawienia
                                    </Route>

                                    <Route component={NotFound} />
                                </Switch>
                            </div>
                        </div>
                    </BrowserRouter>
                </div>
            </div>
        );
    }
}

export default Account;