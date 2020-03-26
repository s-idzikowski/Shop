import * as React from 'react';

import './Account.css';
import { UserData } from '../../../gRPC/service_pb';
import AccountDataRow from './AccountDataRow';

interface IProps {
    user: UserData.AsObject
}

const AccountData = (props: IProps) => {
    return (
        <div>
            <AccountDataRow label="Nazwa użytkownika:" valueInput={props.user.username} />
            <AccountDataRow label="Adres e-mail:" valueInput={props.user.email} />
        </div>
    );
}

export default AccountData;