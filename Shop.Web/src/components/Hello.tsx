import * as React from 'react';

import { HelloReply } from '../../gRPC/greet_pb';

interface IProps {
    response: HelloReply
}

const Hello = (props: IProps) => {

    const response = () => "Response: " + props.response.getMessage();
    const waiting = () => "Waiting for response...";

    return (
        <div>
            <h1>{props.response ? response() : waiting()}</h1>
        </div>
    );
}

export default Hello;