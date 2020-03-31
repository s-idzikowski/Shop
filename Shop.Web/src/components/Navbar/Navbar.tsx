import * as React from 'react';

import './Navbar.css';
import NavbarLink from './NavbarLink';
import Client from '../../class/Client';

class Navbar extends React.Component {
    onUpdate = (): void => this.forceUpdate();

    render(): JSX.Element {
        let menu: { (): JSX.Element };

        if (Client.IsLogged()) {
            menu = (): JSX.Element => {
                return (
                    <ul className="navbar-nav ml-auto">
                        <NavbarLink onUpdate={this.onUpdate} to="/" displayName="Dashboard" />
                        <NavbarLink onUpdate={this.onUpdate} to="/account" displayName="Moje konto" />
                        <NavbarLink onUpdate={this.onUpdate} to="/logout" displayName="Wyloguj" />
                    </ul>
                );
            };
        }
        else {
            menu = (): JSX.Element => {
                return (
                    <ul className="navbar-nav ml-auto">
                        <NavbarLink onUpdate={this.onUpdate} to="/" displayName="Dashboard" />
                        <NavbarLink onUpdate={this.onUpdate} to="/signin" displayName="Zaloguj" />
                        <NavbarLink onUpdate={this.onUpdate} to="/register" displayName="Rejestracja" />
                    </ul>
                );
            };
        }

        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark static-top">
                    <div className="container">
                        <div className="collapse navbar-collapse">
                            {menu()}
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Navbar;