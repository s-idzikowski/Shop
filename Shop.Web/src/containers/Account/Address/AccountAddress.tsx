import * as React from 'react';
import * as grpcWeb from 'grpc-web';

import './../Account.css';
import { AddressData, UserRequest, UserAddressesResponse } from '../../../../gRPC/service_pb';
import AccountAddressRow from './AccountAddressRow';
import ServiceError from '../../../components/ServiceError/ServiceError';
import Loading from '../../../components/Loading/Loading';
import Client from '../../../class/Client';

interface State {
    addresses: Array<AddressData.AsObject>;
    error: boolean;
}

class AccountAddress extends React.Component<Readonly<{}>, State> {
    state: State = {
        addresses: null,
        error: false,
    };

    constructor(props: Readonly<{}>) {
        super(props);

        this.downloadHandler();
    }

    downloadHandler(): void {
        Client.Instance().getUserAddresses(new UserRequest(), Client.Header(), (err: grpcWeb.Error, response: UserAddressesResponse) => {
            Client.CheckError(err, () => {

                const onSuccess = (): void => {
                    this.setState({
                        addresses: response.getAddressdataList().map((value) => value.toObject()),
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
        else if (this.state.addresses == null) {
            return <Loading />
        }

        const items = this.state.addresses.map((value, index) => {
            return <AccountAddressRow key={index} address={value} index={index + 1} />;
        });

        return (
            <div className="p-2">
                <table className="table table-sm">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Imię</th>
                            <th scope="col">Nazwisko</th>
                            <th scope="col">Ulica</th>
                            <th scope="col">Numer domu</th>
                            <th scope="col">Kod pocztowy</th>
                            <th scope="col">Miejscowość</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default AccountAddress;