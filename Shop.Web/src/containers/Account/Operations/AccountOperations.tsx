import * as React from 'react';

import './../Account.css';
import { OperationData } from '../../../../gRPC/service_pb';
import AccountOperationsRow from './AccountOperationsRow';

interface Props {
    operations: Array<OperationData.AsObject>;
}

const AccountOperations = (props: Props): JSX.Element => {
    const items = props.operations.map((value, index) => {
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

export default AccountOperations;