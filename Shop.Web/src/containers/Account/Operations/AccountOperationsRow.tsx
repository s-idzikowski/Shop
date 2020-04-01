import * as React from 'react';

import './../Account.css';
import { OperationData, OperationTypes } from '../../../../gRPC/service_pb';

interface Props {
    index: number;
    operation: OperationData.AsObject;
}

const AccountOperationsRow: React.FunctionComponent<Props> = (props: Props) => {

    const operationName = (): string => {
        switch (props.operation.type) {
            case OperationTypes.REGISTER:
                return "Rejestracja";

            case OperationTypes.LOGIN:
                return "Prawidłowe logowanie";

            case OperationTypes.FAILEDLOGIN:
                return "Błędne logowanie";

            case OperationTypes.LOGOUT:
                return "Wylogowano";

            case OperationTypes.CHANGEPASSWORD:
                return "Zmiana hasła";

            case OperationTypes.CHANGEADDRESSES:
                return "Zmiana adresów";

            case OperationTypes.CHANGEINFORMATION:
                return "Zmiana danych użytkownika";

            default:
                return "Niezdefiniowana operacja " + props.operation.type;
        }
    };

    const operationColor = (): string => {
        switch (props.operation.type) {
            case OperationTypes.REGISTER:
                return "text-primary";

            case OperationTypes.LOGIN:
                return "text-success";

            case OperationTypes.FAILEDLOGIN:
                return "text-danger";

            case OperationTypes.LOGOUT:
                return "text-warning";

            case OperationTypes.CHANGEPASSWORD:
                return "text-info";

            case OperationTypes.CHANGEADDRESSES:
                return "text-info";

            case OperationTypes.CHANGEINFORMATION:
                return "text-info";

            default:
                return "text-muted";
        }
    };

    return (
        <tr>
            <th scope="row">{props.index}</th>
            <td className={operationColor()}>{operationName()}</td>
            <td>{props.operation.time}</td>
            <td>{props.operation.ip}</td>
        </tr>
    );
}

export default AccountOperationsRow;