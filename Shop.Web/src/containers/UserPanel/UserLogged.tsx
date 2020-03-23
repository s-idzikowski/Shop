import * as React from 'react';

import './UserPanel.css';
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

            <UserLoggedRow label="Data rejestracji:" valueInput={props.user.registertime} />
            <UserLoggedRow label="Adres IP rejestracji:" valueInput={props.user.registerip} />

            <UserLoggedRow label="Data ostatniego logowania:" valueInput={props.user.logintime} />
            <UserLoggedRow label="Adres IP logowania:" valueInput={props.user.loginip} />

            <UserLoggedRow label="[DEBUG] AuthToken:" valueInput={props.user.authkey} />
        </div>
    );
}

export default UserLogged;