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

    const [errors, setErrors] = useState({
        userName: "",
        pw: "",
    });

    const onInputChange = (e) => {
        setSalesLeaderCredentials({ ...salesLeaderCredentials, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = { userName: "", pw: "" };

        if (!salesLeaderCredentials.userName) {
            newErrors.userName = "Username is required";
            isValid = false;
        }

        if (!salesLeaderCredentials.pw) {
            newErrors.pw = "Password is required";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            axios.get(`https://maxol-sales-rep-track-api-akk9s.ondigitalocean.app/leaderlogin?userName=${userName}&pw=${pw}`)
                .then((response) => {
                    // Check if the response data contains the user's ID (adjust this depending on the JSON structure
                    if (response.data.Login) {
                        // Use the ID to navigate to the SLSalesRep component
                        localStorage.setItem("token",response.data.token);
                        Swal.fire("Success!", "Logged in successfully!", "success");
                        navigate(`/SLSalesRep/${response.data.result[0].id}`);
                    } else {
                        Swal.fire("Error!", "Invalid username or password", "error");
                    }
                })
                .catch((error) => {
                    if (error.response) {
                        // The request was made, and the server responded with an error status code
                        if (error.response.status === 401) {
                            Swal.fire("Error!", "Invalid username or password", "error");
                        } else {
                            Swal.fire("Error!", "An error occurred", "error");
                        }
                    } else {
                        // Network or other errors occurred
                        Swal.fire("Error!", "Network error occurred", "error");
                    }
                });
        }
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
                                className={`form-control ${errors.userName && "is-invalid"}`}
                                placeholder="Enter your username"
                                name="userName"
                                value={userName}
                                onChange={(e) => onInputChange(e)}
                            />
                            {errors.userName && (
                                <div className="invalid-feedback">{errors.userName}</div>
                            )}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="pw" className="form-label">
                                Password
                            </label>
                            <input
                                type="password"
                                className={`form-control ${errors.pw && "is-invalid"}`}
                                placeholder="Enter your password"
                                name="pw"
                                value={pw}
                                onChange={(e) => onInputChange(e)}
                            />
                            {errors.pw && (
                                <div className="invalid-feedback">{errors.pw}</div>
                            )}
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
