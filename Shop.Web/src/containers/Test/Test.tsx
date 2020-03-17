import * as React from 'react';

import './Test.css';

import { HelloRequest, HelloReply } from '../../../gRPC/greet_pb';
import Client from '../../class/Client';
import Hello from '../../components/Hello';

interface IProps {

}

interface IState {
    message: string,
    response: HelloReply
}

class Test extends React.Component<IProps, IState> {

    state: IState = {
        message: "",
        response: null
    }

    clickHandler = () => {
        const request: HelloRequest = new HelloRequest();
        request.setName(this.state.message);

        Client.Instance().sayHello(request, Client.Header(), (err: any, response: HelloReply) => {
            Client.CheckError(err, () => {
                console.log(response.getMessage());

                this.setState({
                    message: "",
                    response: response
                });
            });
        });
    };

    handleChange = (e: any) => {
        this.setState({
            message: e.target.value
        });
    }

    render() {
        return (
            <div>
                <h1>Test message to service gRPC:</h1>

                <form>
                    <label>
                        Message:
                        <input type="text" value={this.state.message} onChange={this.handleChange.bind(this)} />
                    </label>

                    <input type="button" onClick={this.clickHandler.bind(this)} value="Send" />
                </form>

                <Hello response={this.state.response} />
            </div>
        );
    }
}

export default Test;