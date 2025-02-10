import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Payments from "./payments";

const Header = ({ auth, dispatch }) => {
    const renderContent = () => {
        switch (auth) {
            case null:
                return;
            case false:
                return <li><a href="/auth/google">Login With Google</a></li>;
            default:
                return (
                    <>
                        <li><Payments/></li>
                        <li>
                            <a href="/api/logout">Logout</a>
                        </li>
                    </>
                );
        }
    }

    return (
        <nav>
            <div className="nav-wrapper">
                <Link to={auth ? '/surveys' : '/'} className="left brand-logo">
                    Emaily
                </Link>
                <ul className="right">
                    {renderContent()}
                </ul>
            </div>
        </nav>
    );
};

const mapStateToProps = ({ auth }) => {
    return { auth };
}

export default connect(mapStateToProps)(Header);