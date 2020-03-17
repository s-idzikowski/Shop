import * as React from 'react';

import './Header.css';
import { BrowserRouter, Link } from 'react-router-dom';

const Header = () => {

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark static-top">
                <div className="container">
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/">Dashboard </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/test">Test</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Header;