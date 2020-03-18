import * as React from 'react';

import './Navbar.css';
import NavbarLink from './NavbarLink';

const Navbar = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark static-top">
                <div className="container">
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav ml-auto">
                            <NavbarLink to="/" displayName="Dashboard"/>
                            <NavbarLink to="/signin" displayName="Zaloguj"/>
                            <NavbarLink to="/register" displayName="Rejestracja"/>

                            <NavbarLink to="/test" displayName="TEST"/>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;