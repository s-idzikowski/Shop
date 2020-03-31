import * as React from 'react';
import * as grpcWeb from 'grpc-web';

import './../Account.css';
import { OperationData, UserRequest, UserOperationsResponse } from '../../../../gRPC/service_pb';
import AccountOperationsRow from './AccountOperationsRow';
import ServiceError from '../../../components/ServiceError/ServiceError';
import Loading from '../../../components/Loading/Loading';
import Client from '../../../class/Client';

interface State {
    operations: Array<OperationData.AsObject>;
    error: boolean;
}

class AccountOperations extends React.Component<Readonly<{}>, State> {
    state: State = {
        operations: null,
        error: false,
    };

    constructor(props: Readonly<{}>) {
        super(props);

        this.downloadHandler();
    }

    downloadHandler(): void {
        Client.Instance().getUserOperations(new UserRequest(), Client.Header(), (err: grpcWeb.Error, response: UserOperationsResponse) => {
            Client.CheckError(err, () => {

                const onSuccess = (): void => {
                    this.setState({
                        operations: response.getOperationdataList().map((value) => value.toObject()),
                        error: false,
                    });
                };

                const onError = (): void => {
                    this.setState({
                        error: true
                    });
                };

                Client.CheckStatusCode(response.getStatuscode(), onError, onSuccess, null);

            }, () => {
                this.setState({
                    error: true
                });
            });
        });
    }

    render(): JSX.Element {
        if (this.state.error) {
            return <ServiceError />
        }
        else if (this.state.operations == null) {
            return <Loading />
        }

        const items = this.state.operations.map((value, index) => {
            return <AccountOperationsRow key={index} operation={value} index={index + 1} />;
        });

        return (
            <div className="p-2">
                <table className="table table-sm">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Operacja</th>
                            <th scope="col">Data</th>
                            <th scope="col">Adres IP</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default AccountOperations;