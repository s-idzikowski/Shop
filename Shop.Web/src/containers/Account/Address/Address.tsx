import * as React from 'react';

import './../Account.css';
import { AddressData } from '../../../../gRPC/service_pb';
import Loading from '../../../components/Loading/Loading';
import { Button, Label, Input } from 'reactstrap';
import ClientHelper from '../../../class/ClientHelper';
import { toast } from 'react-toastify';

interface Props {
    index?: number;
    address?: AddressData.AsObject;
    saveHandler: (address: AddressData.AsObject, index: number) => void;
    cancelHandler: () => void;
}

interface State {
    address: AddressData.AsObject;
}

class Address extends React.Component<Props, State> {
    state: State = {
        address: null,
    };

    constructor(props: Props) {
        super(props);

        this.state = {
            address: props.address ?? new AddressData().toObject()
        };
    }

    nameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const address: AddressData.AsObject = this.state.address;
        address.name = e.target.value;
        this.setState({
            address: address
        });
    }

    streetChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const address: AddressData.AsObject = this.state.address;
        address.street = e.target.value;
        this.setState({
            address: address
        });
    }


    placeChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const address: AddressData.AsObject = this.state.address;
        address.place = e.target.value;
        this.setState({
            address: address
        });
    }


    zipcodeChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const address: AddressData.AsObject = this.state.address;
        address.zipcode = e.target.value;
        this.setState({
            address: address
        });
    }


    cityChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const address: AddressData.AsObject = this.state.address;
        address.city = e.target.value;
        this.setState({
            address: address
        });
    }

    saveHandler = (): void => {
        if (!this.validate())
            return;

        this.props.saveHandler(this.state.address, this.props.index);
    }

    validate = (): boolean => {
        let status = true;

        if (!ClientHelper.ValidateLength(this.state.address.name)) {
            status = false;
            toast.warn("Pole 'Imię i nazwisko / Nazwa firmy' jest niepoprawne.");
        }

        if (!ClientHelper.ValidateLength(this.state.address.street)) {
            status = false;
            toast.warn("Pole 'Ulica' jest niepoprawne.");
        }

        if (!ClientHelper.ValidateLength(this.state.address.zipcode, 6)) {
            status = false;
            toast.warn("Pole 'Kod pocztowy' jest niepoprawne.");
        }

        if (!ClientHelper.ValidateLength(this.state.address.city)) {
            status = false;
            toast.warn("Pole 'Miejscowość' jest niepoprawne.");
        }

        return status;
    }

    render(): JSX.Element {
        if (!this.state.address) {
            return <Loading />
        }

        const cssRow = "row m-2";
        const cssColumn = "col-* p-1";
        const cssButton = "col p-1 m-1";

        return (
            <div>
                <div className={cssRow}>
                    <div className={cssColumn}>
                        <Label>Imię i nazwisko / Nazwa firmy:</Label>
                    </div>
                    <div className={cssColumn}>
                        <Input value={this.state.address.name} onChange={this.nameChangeHandler.bind(this)} />
                    </div>
                </div>

                <div className={cssRow}>
                    <div className={cssColumn}>
                        <Label>Ulica:</Label>
                    </div>
                    <div className={cssColumn}>
                        <Input value={this.state.address.street} onChange={this.streetChangeHandler.bind(this)} />
                    </div>

                    <div className={cssColumn}>
                        <Label>Lokal:</Label>
                    </div>
                    <div className={cssColumn}>
                        <Input value={this.state.address.place} onChange={this.placeChangeHandler.bind(this)} />
                    </div>
                </div>

                <div className={cssRow}>
                    <div className={cssColumn}>
                        <Label>Kod pocztowy:</Label>
                    </div>
                    <div className={cssColumn}>
                        <Input value={this.state.address.zipcode} onChange={this.zipcodeChangeHandler.bind(this)} />
                    </div>

                    <div className={cssColumn}>
                        <Label>Miejscowość:</Label>
                    </div>
                    <div className={cssColumn}>
                        <Input value={this.state.address.city} onChange={this.cityChangeHandler.bind(this)} />
                    </div>
                </div>

                <div className={cssRow}>
                    <Button className={cssButton} onClick={this.saveHandler}>Zapisz</Button>
                    <Button className={cssButton} onClick={this.props.cancelHandler}>Anuluj</Button>
                </div>
            </div>
        );
    }
}

export default Address;