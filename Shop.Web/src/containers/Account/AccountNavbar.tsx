import * as React from 'react';

import NavbarLink from '../../components/Navbar/NavbarLink';
import Client from '../../class/Client';
import { Roles } from '../../../gRPC/service_pb';

class AccountNavbar extends React.Component {
    onUpdate = (): void => this.forceUpdate();

    render(): JSX.Element {
        const css = "list-group-item list-group-item-action list-group-item-light";

        return (
            <div className="shadow p-2 m-2">
                <ul className="list-group">
                    <NavbarLink onUpdate={this.onUpdate} to="/account/information" displayName="Moje dane" cssType={css} extraTo="/account" />
                    <NavbarLink onUpdate={this.onUpdate} to="/account/address" displayName="Moje adresy" cssType={css} />
                    <NavbarLink onUpdate={this.onUpdate} to="/account/changepassword" displayName="Zmień hasło" cssType={css} />
                    <NavbarLink onUpdate={this.onUpdate} to="/account/log" displayName="Dziennik aktywności" cssType={css} />
                    <NavbarLink onUpdate={this.onUpdate} to="/account/settings" displayName="Ustawienia" cssType={css} />

                    {Client.HasRole(Roles.ADMINISTRATION_CATEGORIES) ? <NavbarLink onUpdate={this.onUpdate} to="/account/administration" displayName="Administracja" cssType={css} /> : ""}
                </ul>
            </div>
        );
    }
}

export default AccountNavbar;