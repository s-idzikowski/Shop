import * as React from 'react';

import NavbarLink from '../../components/Navbar/NavbarLink';

interface Props {
    accountHandler: () => void;
    operationsHandler: () => void;
    addressesHandler: () => void;
}

class AccountNavbar extends React.Component<Props> {
    onUpdate = (): void => this.forceUpdate();

    render(): JSX.Element {
        const css = "list-group-item list-group-item-action list-group-item-light";

        return (
            <div className="shadow p-2 m-2">
                <ul className="list-group">
                    <NavbarLink onClick={this.props.accountHandler} onUpdate={this.onUpdate} to="/account" displayName="Moje dane" cssType={css} />
                    <NavbarLink onClick={this.props.addressesHandler} onUpdate={this.onUpdate} to="/account/address" displayName="Moje adresy" cssType={css} />
                    <NavbarLink onUpdate={this.onUpdate} to="/account/changepassword" displayName="Zmień hasło" cssType={css} />
                    <NavbarLink onClick={this.props.operationsHandler} onUpdate={this.onUpdate} to="/account/log" displayName="Dziennik aktywności" cssType={css} />
                    <NavbarLink onUpdate={this.onUpdate} to="/account/settings" displayName="Ustawienia" cssType={css} />
                </ul>
            </div>
        );
    }
}

export default AccountNavbar;