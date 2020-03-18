import * as React from 'react';
import { Link } from 'react-router-dom';

interface IProps {
    to: string,
    displayName: string
}

const NavbarLink = (props: IProps) => {
    return (
        <li className="nav-item">
            <Link className="nav-link" to={props.to}>{props.displayName}}</Link>
        </li>
    );
}

export default NavbarLink;