import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
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

    const {name, userName, mobileNo, address, type} = salesLeader;
    const onInputChange = (e) => {
        setSalesLeader({...salesLeader, [e.target.name]: e.target.value});
    };

    const onSubmit = async (e) => {
        e.preventDefault();
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
                const response = await axios.post("https://maxol-sales-rep-track-api-akk9s.ondigitalocean.app/regUser", salesLeader);
                if (response.data) {
                    await Swal.fire({
                        title: 'Saved!',
                        text: 'SalesLeader saved successfully!',
                        icon: 'success',
                        html: `SalesLeader's Password: ${response.data}`
                    });
                    navigate("/salesLeader")

                } else {
                    Swal.fire('Error!', 'Failed to save SalesLeader.', 'error');
                }
            }
        })

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
                                type={"text"}
                                className="form-control"
                                placeholder="Enter your salesLeadername"
                                name="name"
                                value={name}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="userName" className="form-label">
                                User Name
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter your userName"
                                name="userName"
                                value={userName}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="mobileNo" className="form-label">
                                Contact
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter your mobileNo"
                                name="mobileNo"
                                value={mobileNo}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Address" className="form-label">
                                Address
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter your e-mail"
                                name="address"
                                value={address}
                                onChange={(e) => onInputChange(e)}
                            />
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