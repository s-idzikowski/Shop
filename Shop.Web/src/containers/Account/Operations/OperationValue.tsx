import React, { useState } from 'react';

import './../Account.css';
import { ValueData, PropertyNames } from '../../../../gRPC/service_pb';
import { Tooltip } from 'reactstrap';

interface Props {
    index: string;
    valueData: ValueData.AsObject;
    type: string;
}

const OperationValue: React.FunctionComponent<Props> = (props: Props) => {

    const [tooltipOpen, setTooltipOpen] = useState(false);
    const toggleToolTip = (): void => setTooltipOpen(!tooltipOpen);

    const propertyName = (): string => {
        switch (props.valueData.propertyname) {
            case PropertyNames.USERNAME:
                return "Nazwa użytkownika";

            case PropertyNames.EMAIL:
                return "Adres e-mail";

            case PropertyNames.TELEPHONE:
                return "Telefon";

            case PropertyNames.PASSWORD_HASH:
                return "Hasło HASH";

            case PropertyNames.PASSWORD_SALT:
                return "Hasło SALT";

            case PropertyNames.NAME:
                return "Imię i nazwisko / Nazwa firmy";

            case PropertyNames.STREET:
                return "Ulica";

            case PropertyNames.PLACE:
                return "Lokal";

            case PropertyNames.ZIPCODE:
                return "Kod pocztowy";

            case PropertyNames.CITY:
                return "Miejscowość";

            default:
                return "Niezdefiniowane pole " + props.valueData.propertyname;
        }
    };

    const operationId: string = "toolTipOperation-" + props.index + "-" + props.type;

    const css: string = props.valueData.propertyvalue ? "" : " collapse";

    return (
        <div className={"p-2" + css} id={operationId}>
            <h6>{propertyName() + ":"}</h6>
            <div className="text-truncate">{props.valueData.propertyvalue}</div>
            <Tooltip placement="bottom" isOpen={tooltipOpen} target={operationId} toggle={toggleToolTip}>
                {props.valueData.propertyvalue}
            </Tooltip>
        </div>
    );
}

export default OperationValue;