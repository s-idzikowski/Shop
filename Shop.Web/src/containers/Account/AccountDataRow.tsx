import * as React from 'react';

import './Account.css';
import { Label, Input } from 'reactstrap';

interface IProps {
    label: string,
    valueInput: string,
}

const UserAccountRow = (props: IProps) => {
    return (
        <div>
            <Label>{props.label}</Label>
            <Input readOnly value={props.valueInput} />
        </div>
    );
}

export default UserAccountRow;