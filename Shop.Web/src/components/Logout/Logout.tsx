import * as React from 'react';
import Client from '../../class/Client';
import { UserRequest, BasicResponse } from '../../../gRPC/service_pb';
import { toast } from 'react-toastify';
import { Redirect } from 'react-router-dom';

interface IProps {
    onLogout: () => void,
}

const Logout = (props: IProps) => {
    const request: UserRequest = new UserRequest();

    Client.Instance().userLogout(request, Client.Header(), (err: any, response: BasicResponse) => {
        Client.CheckError(err, () => {

            const onSuccess = () => {
                window.sessionStorage.clear();
                toast.success("Poprawnie wylogowano.");
                props.onLogout();
            };

            Client.CheckStatusCode(response.getStatuscode(), null, onSuccess, null);

        })
    });

    return (
        <div>
            <h1>Wylogowywanie...</h1>

            <Redirect to='/' />
        </div>
    );
}

export default Logout;