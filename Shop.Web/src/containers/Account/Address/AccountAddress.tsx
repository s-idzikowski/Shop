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
import Address from './Address';

interface State {
    addresses: Array<AddressData.AsObject>;
    error: boolean;
    loading: boolean;
    address: AddressData.AsObject;
    addressIndex?: number;
}

class AccountAddress extends React.Component<Readonly<{}>, State> {
    state: State = {
        addresses: null,
        error: false,
        loading: false,
        address: null,
        addressIndex: null,
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
        this.setState({
            addressIndex: null,
            address: new AddressData().toObject(),
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

    editHandler(index: number): void {
        this.setState({
            addressIndex: index,
            address: this.state.addresses[index],
        });
    }

    saveHandler(address: AddressData.AsObject, index: number): void {
        const addresses = this.state.addresses;

        if (index != null) {
            addresses[index] = address;
        } else {
            addresses.push(address);
        }

        this.setState({
            addresses: addresses,
            address: null,
            addressIndex: null,
        });

        this.updateAddressesHandler();
    }


    cancelHandler(): void {
        this.setState({
            addressIndex: null,
            address: null,
        });
    }

    removeHandler(index: number): void {
        const addresses = this.state.addresses;
        addresses.splice(index, 1);

        this.setState({
            addresses: addresses,
        });

        this.updateAddressesHandler();
    }

    setDefaultHandler(index: number): void {
        const addresses = this.state.addresses;

        const address = addresses[index];
        addresses.splice(index, 1);
        addresses.unshift(address);

        this.setState({
            addresses: addresses,
        });

        this.updateAddressesHandler();
    }

    render(): JSX.Element {
        if (this.state.error) {
            return <ServiceError />
        }
        else if (this.state.addresses == null || this.state.loading) {
            return <Loading />
        }
        else if (this.state.address) {
            return <Address index={this.state.addressIndex} address={this.state.address} saveHandler={this.saveHandler.bind(this)} cancelHandler={this.cancelHandler.bind(this)} />
        }

        const items = this.state.addresses.map((value, index) => {
            return <AccountAddressRow key={index} address={value} index={index} editHandler={this.editHandler.bind(this)} removeHandler={this.removeHandler.bind(this)} setDefaultHandler={this.setDefaultHandler.bind(this)} />;
        });

        return (
            <div>
                <div className="row">
                    <div className="col-* p-2 m-2">
                        <Button onClick={this.addNewHandler.bind(this)}>Dodaj nowy</Button>
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