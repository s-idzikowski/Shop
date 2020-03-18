import * as React from 'react';

import { HelloData } from '../../../gRPC/service_pb';

interface IProps {
    helloData: HelloData
}

const Hello = (props: IProps) => {
    const response = () => "Response: " + props.helloData.getMessage();
    const waiting = () => "Waiting for response...";

    return (
        <div>
            <h1>{props.helloData ? response() : waiting()}</h1>
        </div>
    );
}

export default Hello;