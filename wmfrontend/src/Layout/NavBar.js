import React from "react";
import {Link, useLocation} from "react-router-dom";
import "../NavBar.css";
import {NavLink} from "react-bootstrap";

export default function NavBar({isAuthenticated, userRole}) {

    const deleteToken = () => {
        localStorage.clear();
    }
    const getNavLinks = () => {
        if (isAuthenticated) {
            if (userRole === "home") {
                return (
                    <>
                    </>
                );
            } else if (userRole === "leader") {
                return (
                    <>
                        <li className="nav-item">
                            <Link className="nav-link ul-auto" to="/" onClick={() =>deleteToken()}>
                                LogOut
                            </Link>
                        </li>

                    </>
                );
            } else if (userRole === "admin") {
                return (
                    <>
                        <li className="nav-item">
                            <Link className="nav-link ul-auto active" to="/salesdata">
                                SalesData
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link ul-auto active" to="/salesRef">
                                SalesRep
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link ul-auto active" to="/salesLeader">
                                SalesLeader
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link ul-auto active" to="/viewProducts">
                                Products
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link ul-auto mapCustomer" to="/mapCustomer">
                                Customer Map
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link ul-auto" to="/" onClick={() =>deleteToken()}>
                                LogOut
                            </Link>
                        </li>
                    </>
                );
            } else {
                return (
                    <>
                    </>
                );
            }
        }
    }


    return (
        <nav className="navbar navbar-expand-lg navbar-light custom-orange-bg">
            <div className="container navcontainer" style={{marginLeft: "30em", marginRight: "0.2em"}}>
                <Link to="/" className="navbar-brand">
                    <h1 style={{
                        color: "white",
                        fontFamily: "Inter",
                        fontWeight: "bold",
                        marginTop: "0.6em",
                        fontSize: "1.7rem",
                        marginLeft: "-17em"
                    }}>
                        SALES TRACKING SYSTEM
                    </h1>
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav">
                        {getNavLinks()}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
