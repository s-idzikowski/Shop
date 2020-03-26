import * as React from 'react';

import './Navbar.css';
import NavbarLink from './NavbarLink';
import Client from '../../class/Client';

const Navbar = () => {

    const isLogged: boolean = Client.IsLogged();

    const signIn = () => <NavbarLink to="/signin" displayName="Zaloguj" />;
    const register = () => <NavbarLink to="/register" displayName="Rejestracja" />;
    const account = () => <NavbarLink to="/account" displayName="Moje konto" />;
    const logOut = () => <NavbarLink to="/logout" displayName="Wyloguj" />;

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark static-top">
                <div className="container">
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav ml-auto">
                            <NavbarLink to="/" displayName="Dashboard" />

                            {isLogged ? "" : signIn()}
                            {isLogged ? "" : register()}

                            {isLogged ? account() : ""}

                            {isLogged ? logOut() : ""}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;