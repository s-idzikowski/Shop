import * as React from 'react';
import Client from '../../class/Client';
import { LogoutRequest, LogoutResponse, StatusCode } from '../../../gRPC/service_pb';
import { toast } from 'react-toastify';
import { Redirect } from 'react-router-dom';

interface IProps {
    onLogout: () => void,
}

const Logout = (props: IProps) => {

    const request: LogoutRequest = new LogoutRequest();

    Client.Instance().userLogout(request, Client.Header(), (err: any, response: LogoutResponse) => {
        Client.CheckError(err, () => {
            switch (response.getStatuscode()) {
                case StatusCode.OK:

                    window.sessionStorage.clear();
                    toast.success("Poprawnie wylogowano.");

                    props.onLogout();

                    break;
                case StatusCode.UNATHORIZED:

                    window.sessionStorage.clear();
                    toast.info("Błąd - wylogowano!");

                    break;
            }
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