import React, {Component} from 'react';
import {Link} from "react-router-dom";

class Navbar extends Component {
    render() {
        return (
            <>

                <nav className="navbar navbar-expand-sm navbar-dark bg-secondary mb-4">
                    <div className="container">

                        <Link to="/" className="navbar-brand">
                            Expense Manager
                        </Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#mobile-nav">
                            <span className="navbar-toggler-icon"/>
                        </button>

                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <Link to="/dashboard" className="nav-link">
                                        Dashboard
                                    </Link>
                                </li>
                            </ul>
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link to="/" className="nav-link">
                                        Sign Up
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/" className="nav-link">
                                        Login
                                    </Link>
                                </li>
                            </ul>
                        </div>

                    </div>
                </nav>

            </>
        );
    }
}

export default Navbar;