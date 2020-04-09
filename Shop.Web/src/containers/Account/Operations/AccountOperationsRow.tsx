import React, { useState } from 'react';

import './../Account.css';
import { OperationData, OperationTypes, ValueData, ListOfValue } from '../../../../gRPC/service_pb';
import { Button, Collapse } from 'reactstrap';
import OperationValue from './OperationValue';

interface Props {
    index: number;
    operation: OperationData.AsObject;
}

const AccountOperationsRow: React.FunctionComponent<Props> = (props: Props) => {
    const [isOpen, setOpen] = useState(false);

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

    const operationId: string = "operation-" + props.index;

    const onClick = (): void => {
        setOpen(!isOpen);
    };

    const singleItem = (array: ValueData.AsObject[], type: string, index1: number): JSX.Element[] => {
        return array.map((value, index2) => {
            const id: string = index1 + "-" + index2 + "-" + props.index;
            return <OperationValue key={id} valueData={value} index={id} type={type} />;
        });
    };

    const items = (array: ListOfValue.AsObject[], type: string): JSX.Element[][] => {
        return array.map((value, index1) => {
            return singleItem(value.valueList, type, index1);
        });
    };

    const itemsBefore = props.operation.valuebeforeList?.length > 0 ? (
        <div>
            <h5>Przed zmianami:</h5>
            {items(props.operation.valuebeforeList, "Before")}
        </div>
    ) : "";

    const itemsAfter = props.operation.valueafterList?.length > 0 ? (
        <div>
            <h5>Po zmianach:</h5>
            {items(props.operation.valueafterList, "After")}
        </div>
    ) : "";

    return (
        <div className="tableRow">
            <div className="row">
                <div className="col-1">{props.index}</div>
                <div className={"col-6 " + operationColor()}>{operationName()}</div>
                <div className="col-3">{props.operation.time}</div>
                <div className="col-2">
                    <Button onClick={onClick} aria-controls={operationId} aria-expanded={isOpen}>Szczegóły</Button>
                </div>
            </div>

            <Collapse isOpen={isOpen} id={operationId}>
                <div className="row">
                    <div className="col-2">
                        <h6>Adres IP:</h6>
                        <p>{props.operation.ip}</p>
                    </div>

                    <div className="col-5">
                        {itemsBefore}
                    </div>

                    <div className="col-5">
                        {itemsAfter}
                    </div>
                </div>
            </Collapse>
        </div>
    );
}

export default AccountOperationsRow;