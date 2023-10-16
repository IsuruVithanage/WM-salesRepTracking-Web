import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../NavBar.css";

export default function NavBar() {
    const location = useLocation();

    // Check if the current route is the login page
    const isLoginPage = location.pathname === "/"|location.pathname === "/adminLogin"; // Adjust the route as needed

    return (
        <nav className="navbar navbar-expand-lg navbar-light custom-orange-bg">
            <div className="container navcontainer" style={{ marginLeft: "30em", marginRight: "0.2em"}}>
                <Link to="/" className="navbar-brand">
                    <h1 style={{ color: "white", fontFamily: "Inter", fontWeight: "bold", marginTop: "0.6em", fontSize: "1.7rem", marginLeft: "-17em" }}>
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
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav" >
                    <ul className="navbar-nav"> {/* Use ml-auto class */}
                        {isLoginPage ? (
                            <li className="nav-item">
                                {/* Add any login-specific content or links here */}
                            </li>
                        ) : (
                            // Render the regular links for other pages
                            <>
                                <li className="nav-item">
                                    <Link to="/salesdata" className="nav-link">
                                        SalesData
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/salesRef" className="nav-link">
                                        SalesRep
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/salesLeader" className="nav-link">
                                        SalesLeader
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/mapLocation" className="nav-link">
                                        Location
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/mapCustomer" className="nav-link">
                                        Customer Map
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/" className="nav-link">
                                        LogOut
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
