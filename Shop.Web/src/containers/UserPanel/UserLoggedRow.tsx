import * as React from 'react';

import './UserPanel.css';
import { Label, Input } from 'reactstrap';

interface IProps {
    label: string,
    valueInput: string,
}

const UserLoggedRow = (props: IProps) => {
    return (
        <div>
            <Label>{props.label}</Label>
            <Input readOnly value={props.valueInput} />
        </div>
    );
}

export default UserLoggedRow;