import * as React from 'react';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

import './../Account.css';
import { AddressData } from '../../../../gRPC/service_pb';
import { Button } from 'reactstrap';

interface Props {
    index: number;
    address: AddressData.AsObject;
    editHandler: (index: number) => void;
    removeHandler: (index: number) => void;
    setDefaultHandler: (index: number) => void;
}

const AccountAddressRow: React.FunctionComponent<Props> = (props: Props) => {
    const cssColumn = "col-* p-1";
    const cssSub = "p-1 ml-4 mr-2 text-secondary";
    const cssValue = "font-weight-bold";
    const cssButtonRow = "row p-1 pr-3";
    const cssButton = "col p-1 m-1";

    const isDefault = props.index == 0;
    const cssDefault = isDefault ? "p-2 m-2 shadow border border-success" : "p-2 m-2 shadow";
    const textDefault = isDefault ? (
        <div className="text-center addressRow">Adres domyślny</div>
    ) : "";
    const buttonDefault = !isDefault ? (
        <div className={cssButtonRow}>
            <Button className={cssButton} onClick={(): void => props.setDefaultHandler(props.index)}>Ustaw jako domyślny</Button>
        </div>
    ) : "";

    return (
        <div className={cssDefault}>
            <div className="row">
                <div className="col-8">
                    {textDefault}

                    <div className="row">
                        <div className={cssColumn}><sub className={cssSub}>Imię i nazwisko / Nazwa firmy:</sub><strong className={cssValue}>{props.address.name}</strong></div>
                    </div>

                    <div className="row">
                        <div className={cssColumn}><sub className={cssSub}>Ulica:</sub><strong className={cssValue}>{props.address.street}</strong></div>
                        <div className={cssColumn}><sub className={cssSub}>Lokal:</sub><strong className={cssValue}>{props.address.place}</strong></div>
                    </div>

                    <div className="row">
                        <div className={cssColumn}><sub className={cssSub}>Kod pocztowy:</sub><strong className={cssValue}>{props.address.zipcode}</strong></div>
                        <div className={cssColumn}><sub className={cssSub}>Miejscowość:</sub><strong className={cssValue}>{props.address.city}</strong></div>
                    </div>
                </div>

                <div className="col-4">
                    <div className={cssButtonRow}>
                        <FaEdit cursor="pointer" className={cssButton + " editIcon"} onClick={(): void => props.editHandler(props.index)} />
                        <MdDelete cursor="pointer" className={cssButton + " removeIcon"} onClick={(): void => props.removeHandler(props.index)} />
                    </div>

                    {buttonDefault}
                </div>
            </div>
        </div>
    );
}

export default AccountAddressRow;