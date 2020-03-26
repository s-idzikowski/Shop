import * as React from 'react';
import Client from '../../class/Client';
import { UserRequest, BasicResponse } from '../../../gRPC/service_pb';
import { toast } from 'react-toastify';
import Loading from '../Loading/Loading';

interface IProps {
    onLogout: () => void,
}

const Logout = (props: IProps) => {
    const request: UserRequest = new UserRequest();

    Client.Instance().userLogout(request, Client.Header(), (err: any, response: BasicResponse) => {
        Client.CheckError(err, () => {

            const onSuccess = () => {
                toast.success("Poprawnie wylogowano.");
                props.onLogout();

                Client.Redirect();
            };

            Client.CheckStatusCode(response.getStatuscode(), null, onSuccess, null);
        }, () => {
            toast.info("Wylogowano.");
            props.onLogout();

            Client.Redirect();
        });
    });

    return (
        <div>
            <h1>Wylogowywanie...</h1>
            <Loading />
        </div>
    );
}

export default Logout;