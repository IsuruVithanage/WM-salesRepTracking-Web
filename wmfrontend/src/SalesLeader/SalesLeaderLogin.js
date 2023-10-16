import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function SalesLeaderLogin() {
    let navigate = useNavigate();

    const [salesLeaderCredentials, setSalesLeaderCredentials] = useState({
        id: "",
        password: "",
    });

    const { id, password } = salesLeaderCredentials;

    const onInputChange = (e) => {
        setSalesLeaderCredentials({ ...salesLeaderCredentials, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        // Your form submission logic here...
    };

    return (
        <div className="container h-100 mx-auto" style={{marginTop: "10%"}}>
            <div className="row h-100 justify-content-center align-items-center">
                <div className="col-md-4 border rounded p-4 shadow">
                    <h2 className="text-center m-4">SALES LEADER LOGIN</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="ID" className="form-label">
                                Username
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter your ID"
                                name="id"
                                value={id}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Password" className="form-label">
                                Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Enter your password"
                                name="password"
                                value={password}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <Link className="obtn" to="/salesdata">
                            Login
                        </Link>
                        <Link className="bbtn" to="/">
                            Cancel
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}
