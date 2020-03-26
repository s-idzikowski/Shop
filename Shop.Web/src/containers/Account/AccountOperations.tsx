import * as React from 'react';

import './Account.css';
import { OperationData } from '../../../gRPC/service_pb';
import AccountOperationsRow from './AccountOperationsRow';

interface IProps {
    operations: Array<OperationData.AsObject>
}

const AccountOperations = (props: IProps) => {
    const items = props.operations.map((value, index) => {
        return <AccountOperationsRow key={index} operation={value} />;
    });

    return (
        <div className="p-2">
            {items}
        </div>
    );
}

export default AccountOperations;