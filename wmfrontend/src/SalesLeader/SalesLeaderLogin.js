import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function SalesLeaderLogin() {
    let navigate = useNavigate();

    const [salesLeaderCredentials, setSalesLeaderCredentials] = useState({
        userName: "",
        pw: "",
    });

    const { userName, pw } = salesLeaderCredentials;

    const onInputChange = (e) => {
        setSalesLeaderCredentials({ ...salesLeaderCredentials, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        axios.get(`https://maxol-sales-rep-track-api-akk9s.ondigitalocean.app/leaderlogin?userName=${userName}&pw=${pw}`)
            .then((response) => {
                // Check if the response data contains the user's ID (adjust this depending on the JSON structure)
                const id = response.data[0].id;
                console.log(id);

                if (id) {
                    // Use the ID to navigate to the SLSalesRep component
                    Swal.fire("Success!", "Logged in successfully!", "success");
                    navigate(`/SLSalesRep/${id}`);
                } else {
                    Swal.fire("Error!", "Invalid email or password", "error");
                }
            })
            .catch((error) => {
                if (error.response) {
                    // The request was made, and the server responded with an error status code
                    if (error.response.status === 401) {
                        Swal.fire("Error!", "Invalid email or password", "error");
                    } else {
                        Swal.fire("Error!", "An error occurred", "error");
                    }
                } else {
                    // Network or other errors occurred
                    Swal.fire("Error!", "Network error occurred", "error");
                }
            });
    };

    return (
        <div className="container h-100 mx-auto" style={{ marginTop: "10%" }}>
            <div className="row h-100 justify-content-center align-items-center">
                <div className="col-md-4 border rounded p-4 shadow">
                    <h2 className="text-center m-4">SALES LEADER LOGIN</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="userName" className="form-label">
                                Username
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter your ID"
                                name="userName"
                                value={userName}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="pw" className="form-label">
                                Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Enter your password"
                                name="pw"
                                value={pw}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <button type="submit" className="obtn">
                            Login
                        </button>
                        <Link className="bbtn" to="/">
                            Cancel
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}
