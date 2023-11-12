import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function AddSalesLeader() {
    let navigate = useNavigate();

    const [salesLeader, setSalesLeader] = useState({
        name: "",
        userName: "",
        mobileNo: "",
        address: "",
        type: "leader"
    });

    const [errors, setErrors] = useState({
        name: "",
        userName: "",
        mobileNo: "",
        address: ""
    });

    const { name, userName, mobileNo, address, type } = salesLeader;

    const onInputChange = (e) => {
        setSalesLeader({ ...salesLeader, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = { name: "", userName: "", mobileNo: "", address: "" };

        if (!name.trim()) {
            newErrors.name = "Name is required";
            isValid = false;
        }

        if (!userName.trim()) {
            newErrors.userName = "User Name is required";
            isValid = false;
        }

        if (!mobileNo.trim()) {
            newErrors.mobileNo = "Contact is required";
            isValid = false;
        } else if (!/^\d{10}$/.test(mobileNo)) {
            newErrors.mobileNo = "Contact must be a 10-digit number";
            isValid = false;
        }

        if (!address.trim()) {
            newErrors.address = "Address is required";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            Swal.fire({
                title: 'Are you sure?',
                text: "You want to Save this!!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Save it!'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const response = await axios.post("https://maxol-sales-rep-track-api-akk9s.ondigitalocean.app/regUser", salesLeader, {
                        headers:{
                            'access-token' : localStorage.getItem("token")
                        }

                    });
                    if (response.data) {
                        await Swal.fire({
                            title: 'Saved!',
                            text: 'SalesLeader saved successfully!',
                            icon: 'success',
                            html: `SalesLeader's UserName: ${response.data.userName}   Password: ${response.data.generatedPassword}`
                        });
                        navigate("/salesLeader")
                    } else {
                        Swal.fire('Error!', 'Failed to save SalesLeader.', 'error');
                    }
                }
            })
        }
    };

    return (
        <div className="container h-100 mx-auto">
            <div className="row h-100 justify-content-center align-items-center">
                <div className="col-md-5  border rounded p-4 mt-lg-5 shadow">
                    <h2 className="text-center m-4">Register SalesLeader</h2>

                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="SalesLeadername" className="form-label">
                                SalesLeader Name
                            </label>
                            <input
                                type="text"
                                className={`form-control ${errors.name && "is-invalid"}`}
                                placeholder="Enter your salesLeadername"
                                name="name"
                                value={name}
                                onChange={(e) => onInputChange(e)}
                            />
                            {errors.name && (
                                <div className="invalid-feedback">{errors.name}</div>
                            )}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="userName" className="form-label">
                                User Name
                            </label>
                            <input
                                type="text"
                                className={`form-control ${errors.userName && "is-invalid"}`}
                                placeholder="Enter your userName"
                                name="userName"
                                value={userName}
                                onChange={(e) => onInputChange(e)}
                            />
                            {errors.userName && (
                                <div className="invalid-feedback">{errors.userName}</div>
                            )}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="mobileNo" className="form-label">
                                Contact
                            </label>
                            <input
                                type="text"
                                className={`form-control ${errors.mobileNo && "is-invalid"}`}
                                placeholder="Enter your mobileNo"
                                name="mobileNo"
                                value={mobileNo}
                                onChange={(e) => onInputChange(e)}
                            />
                            {errors.mobileNo && (
                                <div className="invalid-feedback">{errors.mobileNo}</div>
                            )}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Address" className="form-label">
                                Address
                            </label>
                            <input
                                type="text"
                                className={`form-control ${errors.address && "is-invalid"}`}
                                placeholder="Enter your address"
                                name="address"
                                value={address}
                                onChange={(e) => onInputChange(e)}
                            />
                            {errors.address && (
                                <div className="invalid-feedback">{errors.address}</div>
                            )}
                        </div>
                        <button type="submit" className="obtn">
                            Submit
                        </button>
                        <Link className="bbtn" to="/salesLeader">
                            Cancel
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
