import * as React from 'react';
import * as grpcWeb from 'grpc-web';

import './../Account.css';
import { AddressData, UserRequest, UserAddressesResponse, ChangeAddressesRequest, BasicResponse } from '../../../../gRPC/service_pb';
import AccountAddressRow from './AccountAddressRow';
import ServiceError from '../../../components/ServiceError/ServiceError';
import Loading from '../../../components/Loading/Loading';
import Client from '../../../class/Client';
import { Button } from 'reactstrap';
import { toast } from 'react-toastify';

interface State {
    addresses: Array<AddressData.AsObject>;
    error: boolean;
    loading: boolean;
}

class AccountAddress extends React.Component<Readonly<{}>, State> {
    state: State = {
        addresses: null,
        error: false,
        loading: false,
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

    addNewHandler = (): void => {
        const array: Array<AddressData.AsObject> = this.state.addresses;
        const addressData: AddressData = new AddressData();
        
        addressData.setName("Jan Nowak");
        addressData.setStreet("Inżynierska 10");
        addressData.setPlace("30");
        addressData.setZipcode("12-123");
        addressData.setCity("Warszawa");

        array.push(addressData.toObject());

        this.setState({
            addresses: array,
        });
    };

    updateAddressesHandler = (): void => {
        this.setState({
            loading: true,
        });

        const changeAddressesRequest: ChangeAddressesRequest = new ChangeAddressesRequest();
        const array: Array<AddressData> = new Array<AddressData>();
        this.state.addresses.forEach(o => {
            const addressData: AddressData = new AddressData();
            addressData.setName(o.name);
            addressData.setStreet(o.street);
            addressData.setPlace(o.place);
            addressData.setZipcode(o.zipcode);
            addressData.setCity(o.city);
            array.push(addressData);
        });
        changeAddressesRequest.setAddressdataList(array);

        Client.Instance().userChangeAddresses(changeAddressesRequest, Client.Header(), (err: grpcWeb.Error, response: BasicResponse) => {
            Client.CheckError(err, () => {

                const onSuccess = (): void => {
                    toast.success("Adresy zostały zaktualizowane.");

                    this.setState({
                        loading: false,
                    });
                };

                Client.CheckStatusCode(response.getStatuscode(), null, onSuccess, null);

            }, () => {
                this.setState({
                    loading: false,
                });
            });
        });
    };

    render(): JSX.Element {
        if (this.state.error) {
            return <ServiceError />
        }
        else if (this.state.addresses == null || this.state.loading) {
            return <Loading />
        }

        const items = this.state.addresses.map((value, index) => {
            return <AccountAddressRow key={index} address={value} index={index} />;
        });

        return (
            <div>
                <div className="row">
                    <div className="col-* p-2 m-2">
                        <Button onClick={this.addNewHandler.bind(this)}>Dodaj nowy</Button>
                    </div>
                    <div className="col-* p-2 m-2">
                        <Button onClick={this.updateAddressesHandler.bind(this)}>TEMP - Aktualizuj</Button>
                    </div>
                </div>

                <div className="p-2">
                    {items}
                </div>
            </div>
        );
    }
}

export default AccountAddress;