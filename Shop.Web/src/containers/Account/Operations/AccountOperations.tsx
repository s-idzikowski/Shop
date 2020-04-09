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
            <div className="m-2">
                <div className="p-2">
                    <div className="row tableHeader">
                        <div className="col-1"></div>
                        <h4 className="col-6">Operacja</h4>
                        <h4 className="col-3">Data</h4>
                        <div className="col-2"></div>
                    </div>

                    {items}
                </div>
            </div>
        );
    }
}

export default AccountOperations;