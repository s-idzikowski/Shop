import * as React from 'react';

import './../Account.css';
import { AddressData } from '../../../../gRPC/service_pb';
import AccountAddressRow from './AccountAddressRow';

interface Props {
    addresses: Array<AddressData.AsObject>;
}

const AccountAddress = (props: Props): JSX.Element => {
    const items = props.addresses.map((value, index) => {
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

export default AccountAddress;