import * as React from 'react';

import './Account.css';
import { UserData } from '../../../gRPC/service_pb';
import UserLoggedRow from './UserLoggedRow';

interface IProps {
    user: UserData.AsObject
}

const UserLogged = (props: IProps) => {
    return (
        <div>
            <UserLoggedRow label="Nazwa użytkownika:" valueInput={props.user.username} />
            <UserLoggedRow label="Adres e-mail:" valueInput={props.user.email} />

            <UserLoggedRow label="[DEBUG] AuthToken:" valueInput={props.user.authorization} />
        </div>
    );
}

export default UserLogged;