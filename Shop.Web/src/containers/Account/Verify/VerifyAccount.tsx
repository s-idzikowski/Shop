import * as React from 'react';
import * as grpcWeb from 'grpc-web';

import { RouteComponentProps } from 'react-router-dom';
import Loading from '../../../components/Loading/Loading';
import Client from '../../../class/Client';
import { UserRequest, BasicResponse } from '../../../../gRPC/service_pb';
import { toast } from 'react-toastify';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
class VerifyAccount extends React.Component<RouteComponentProps<any>> {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(props: any) {
        super(props);

        const token = this.getUrlParams().get("Bearer");
        this.activeHandler(token);
    }

    activeHandler(token: string): void {

        const header = {
            'Authorization': "Bearer " + token,
        };

        Client.Instance().userActiveAccount(new UserRequest(), header, (err: grpcWeb.Error, response: BasicResponse) => {
            Client.CheckError(err, () => {

                const onSuccess = (): void => {
                    toast.success("Konto zostało aktywowane.");
                };

                const onRedirect = (): void => {
                    window.location.href = "\\";
                };

                Client.CheckStatusCode(response.getStatuscode(), null, onSuccess, onRedirect);

            });
        });
    }

    getUrlParams(): URLSearchParams {
        if (!this.props.location || !this.props.location.search) return new URLSearchParams();
        return new URLSearchParams(this.props.location.search);
    }

    render(): JSX.Element {
        return (
            <Loading />
        );
    }
}

export default VerifyAccount;