import * as React from 'react';

import './UserPanel.css';
import { UserData } from '../../../gRPC/service_pb';
import { Redirect } from 'react-router-dom';
import Client from '../../class/Client';
import { Label, Input } from 'reactstrap';

const UserPanel = () => {

    const user: UserData.AsObject = Client.GetUser();

    return (
        <div>
            {user ? "" : <Redirect to='/' />}

            <h1>Panel użytkownika</h1>

            <Label>Nazwa użytkownika:</Label>
            <Input readOnly value={user.username} />

            <Label>Adres e-mail:</Label>
            <Input readOnly value={user.email} />

            <Label>Data rejestracji:</Label>
            <Input readOnly value={user.registertime} />

            <Label>Adres IP rejestracji:</Label>
            <Input readOnly value={user.registerip} />

            <Label>Data ostatniego logowania:</Label>
            <Input readOnly value={user.logintime} />

            <Label>Adres IP logowania: </Label>
            <Input readOnly value={user.loginip} />

            <Label>[DEBUG] AuthToken: </Label>
            <Input readOnly value={user.authkey} />
        </div>
    );
}

export default UserPanel;