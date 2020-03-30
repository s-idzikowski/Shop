import * as React from 'react';
import { Link } from 'react-router-dom';

interface Props {
    to: string;
    displayName: string;
    cssType?: string;
    onClick?: () => void;
    onUpdate?: () => void;
}

const NavbarLink = (props: Props): JSX.Element => {
    const cssType = props.cssType ?? "nav-link";

    const css = window.location.pathname == props.to ? cssType + " active" : window.location.pathname.includes(props.to) && props.to.length > 1 ? cssType + " active" : cssType;

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