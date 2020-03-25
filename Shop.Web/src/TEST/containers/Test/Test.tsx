import * as React from 'react';
import './Test.css';

import { HelloRequest, HelloReply, HelloData } from '../../../../gRPC/service_pb';
import Client from '../../../class/Client';
import Hello from '../../components/Hello';

import { Label, Button, Input, Form, Tooltip } from 'reactstrap';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Dashboard from '../../../components/Dashboard/Dashboard';
import SignIn from '../../../containers/SignIn/SignIn';
import Register from '../../../containers/Register/Register';
import Logout from '../../../components/Logout/Logout';
import UserPanel from '../../../containers/Account/Account';
import NotFound from '../../../components/NotFound/NotFound';
import NavbarLink from '../../../components/Navbar/NavbarLink';

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

                <h1>Menu:</h1>
                <BrowserRouter>

                    <Link className="nav-link" to="/test">HOME</Link>
                    <Link className="nav-link" to="/test/test1">test1</Link>
                    <Link className="nav-link" to="/test/test2">test2</Link>

                    <div>
                        <Switch>
                            <Route exact path='/test'>
                                HOME
                            </Route>

                            <Route path='/test/test1'>
                                TEST 1
                            </Route>

                            <Route path='/test/test2'>
                                TEST 2
                            </Route>

                            <Route component={NotFound} />
                        </Switch>
                    </div>

                </BrowserRouter>
            </div>
        );
    }
}

export default Test;