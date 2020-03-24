import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface IProps {
    to: string,
    displayName: string,
}

const NavbarLink = (props: IProps) => {

    // ToDo - stan
    //const [css, setCss] = useState("nav-link");
    //const active = () => window.location.pathname.includes(props.to);
    //const updateCss = () => {
    //    setTimeout(() => {
    //        console.log(window.location.pathname);
    //        active() ? setCss("nav-link active") : setCss("nav-link");
    //    }, 10);
    //};

    //return (
    //    <li className="nav-item">
    //        <Link onClick={updateCss} className={css} to={props.to}>{props.displayName}</Link>
    //    </li>
    //);

    return (
        <li className="nav-item">
            <Link className="nav-link" to={props.to}>{props.displayName}</Link>
        </li>
    );
}

export default NavbarLink;