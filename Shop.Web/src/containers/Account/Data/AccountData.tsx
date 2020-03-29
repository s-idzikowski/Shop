import * as React from 'react';

import './../Account.css';
import { UserData } from '../../../../gRPC/service_pb';
import { Label, Input } from 'reactstrap';

interface Props {
    user: UserData.AsObject;
}

const AccountData = (props: Props): JSX.Element => {
    return (
        <div>
            <p>
                <Label>Nazwa użytkownika:</Label>
                <Input readOnly value={props.user.username} />
            </p>

            <p>
                <Label>Adres e-mail:</Label>
                <Input readOnly value={props.user.email} />
            </p>
        </div>
    );
}

export default AccountData;