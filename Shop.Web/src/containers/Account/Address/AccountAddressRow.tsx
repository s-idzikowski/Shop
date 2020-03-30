import * as React from 'react';

import './../Account.css';
import { AddressData } from '../../../../gRPC/service_pb';

interface Props {
    index: number;
    address: AddressData.AsObject;
}

const AccountAddressRow: React.FunctionComponent<Props> = (props: Props) => {
    return (
        <tr>
            <th scope="row">{props.index}</th>
            <td>{props.address.firstname}</td>
            <td>{props.address.lastname}</td>
            <td>{props.address.street}</td>
            <td>{props.address.place}</td>
            <td>{props.address.zipcode}</td>
            <td>{props.address.city}</td>
        </tr>
    );
}

export default AccountAddressRow;