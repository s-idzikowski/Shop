import * as React from 'react';

import './Navbar.css';
import NavbarLink from './NavbarLink';
import { UserData } from '../../../gRPC/service_pb';

const Navbar = () => {

    const user: UserData.AsObject = JSON.parse(window.sessionStorage.getItem("user"));

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

                            {user ? "" : signIn()}
                            {user ? "" : register()}

                            {user ? account() : ""}

                            {user ? logOut() : ""}

                            <NavbarLink to="/test" displayName="TEST" />
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;