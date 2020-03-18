import * as React from 'react';
import './Test.css';

import { HelloRequest, HelloReply, HelloData } from '../../../../gRPC/service_pb';
import Client from '../../../class/Client';
import Hello from '../../components/Hello';

import { Label, Button, Input, Form, Tooltip } from 'reactstrap';

interface IState {
    message: string,
    helloData: HelloData,
    tooltipOpen: boolean
}

class Test extends React.Component {

    state: IState = {
        message: "",
        helloData: null,
        tooltipOpen: false
    }

    clickHandler = () => {
        const request: HelloRequest = new HelloRequest();
        request.setName(this.state.message);

        Client.Instance().sayHello(request, Client.Header(), (err: any, response: HelloReply) => {
            Client.CheckError(err, () => {
                this.setState({
                    message: "",
                    helloData: response.getHellodata()
                });
            })
        });
    };

    textChangeHandler = (e: any) => {
        this.setState({
            message: e.target.value
        });
    }

    closeTooltipButton = () => {
        this.setState({
            tooltipOpen: !this.state.tooltipOpen
        });
    };

    render() {
        const toggle = () => this.closeTooltipButton();

        return (
            <div>
                <h1>Test message to service gRPC:</h1>

                <Form>
                    <Label>
                        <p>Message <span style={{ textDecoration: "underline", color: "blue" }} id="ExampleTooltip">(example)</span>:</p>

                        <Tooltip placement="right" isOpen={this.state.tooltipOpen} autohide={false} target="ExampleTooltip" toggle={toggle}>
                            <div>
                                <p>"Hello my service!"</p>
                                <p>"Aloha"</p>
                                <p>
                                    <Button color="danger">Do nothing &#x1f355;</Button>
                                </p>
                                <p>
                                    <Button onClick={this.closeTooltipButton.bind(this)}>Close Tooltip</Button>
                                </p>
                            </div>
                        </Tooltip>

                        <Input value={this.state.message} onChange={this.textChangeHandler.bind(this)} />
                    </Label>

                    <Button onClick={this.clickHandler.bind(this)}>
                        Send
                    </Button>
                </Form>

                <Hello helloData={this.state.helloData} />
            </div>
        );
    }
}

export default Test;