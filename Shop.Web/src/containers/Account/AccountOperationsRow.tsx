import * as React from 'react';

import './Account.css';
import { Label } from 'reactstrap';
import { OperationData, OperationTypes } from '../../../gRPC/service_pb';

interface IProps {
    operation: OperationData.AsObject,
}

const AccountOperationsRow = (props: IProps) => {

    const operationType = (type: OperationTypes) => {
        switch (type) {
            case OperationTypes.REGISTER:
                return "REGISTER";

            case OperationTypes.LOGIN:
                return "LOGIN";

            case OperationTypes.FAILEDLOGIN:
                return "FAILEDLOGIN";

            case OperationTypes.LOGOUT:
                return "LOGOUT";

            case OperationTypes.CHANGEPASSWORD:
                return "CHANGEPASSWORD";

            default:
                return "UNDEFINED";
        }
    };

    return (
        <div className="ml-2 mr-2 mt-3 mb-3 p-2 shadow-sm">
            <Label className="p-1">{operationType(props.operation.type)}</Label>
            <Label className="p-1">{props.operation.time}</Label>
            <Label className="p-1">{props.operation.ip}</Label>
        </div>
    );
}

export default AccountOperationsRow;