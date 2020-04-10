import * as React from 'react';
import * as grpcWeb from 'grpc-web';

import { UserRequest, CategoriesResponse } from '../../../gRPC/service_pb';
import Client from '../../class/Client';
import Loading from '../../components/Loading/Loading';
import ServiceError from '../../components/ServiceError/ServiceError';

interface State {
    error: boolean;
    loading: boolean;
}

class Administration extends React.Component<Readonly<{}>, State> {
    state: State = {
        error: false,
        loading: true,
    };

    constructor(props: Readonly<{}>) {
        super(props);

        this.downloadHandler();
    }
    
    downloadHandler(): void {
        Client.Instance().getCategories(new UserRequest(), Client.Header(), (err: grpcWeb.Error, response: CategoriesResponse) => {
            Client.CheckError(err, () => {

                const onSuccess = (): void => {
                    this.setState({
                        error: false,
                        loading: false,
                    });

                    // TODO
                    console.log(response.getCategorydataList());

                };

                const onError = (): void => {
                    this.setState({
                        error: true,
                        loading: false,
                    });
                };

                Client.CheckStatusCode(response.getStatuscode(), onError, onSuccess, null);

            }, () => {
                this.setState({
                    error: true,
                    loading: false,
                });
            });
        });
    }

    render(): JSX.Element {
        if (this.state.error) {
            return <ServiceError />
        }
        else if (this.state.loading) {
            return <Loading />
        }

        return (
            <div>
                Administracja
            </div>
        );
    }
}

export default Administration;