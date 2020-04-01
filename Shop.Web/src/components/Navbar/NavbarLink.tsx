import * as React from 'react';
import { Link } from 'react-router-dom';

interface Props {
    to: string;
    extraTo?: string;
    displayName: string;
    cssType?: string;
    onClick?: () => void;
    onUpdate?: () => void;
}

const NavbarLink = (props: Props): JSX.Element => {
    const cssType = props.cssType ?? "nav-link";
    const active = " active";

    const validate = (path: string): string => window.location.pathname == path ? cssType + active : window.location.pathname.indexOf(path) !== -1 && path.length > 1 ? cssType + active : cssType;

    const validateExtra = (path: string): string => window.location.pathname == path ? cssType + active : validate(props.to);

    const css = props.extraTo ? validateExtra(props.extraTo) : validate(props.to);

    const onUpdate = (): void => {
        if (props.onClick)
            props.onClick();
        if (props.onUpdate)
            props.onUpdate();
    }

    return (
        <Link onClick={onUpdate} className={css} to={props.to}>{props.displayName}</Link>
    );
}

export default NavbarLink;