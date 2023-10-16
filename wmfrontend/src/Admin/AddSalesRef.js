import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function AddSalesRef() {
    let navigate = useNavigate();

    const [salesRef, setSalesRef] = useState({
        name: "",
        contact: "",
        email: "",
        address: ""
    });

    const {name, contact, email, address} = salesRef;
    /*
        const onInputChange = (e) => {
            setSalesRef({...salesRef, [e.target.name]: e.target.value});
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
                    Swal.fire(
                        'Saved!',
                        'Your file has been deleted.',
                        'success'
                    )
                    await axios.post("http://localhost:8080/api/v1/salesRef/saveSalesRef", salesRef);
                    navigate("/salesRef");
                }
            })

        };*/
    return (
        <div className="container h-100 mx-auto">
            <div className="row h-100 justify-content-center align-items-center">
                <div className="col-md-5  border rounded p-4 mt-lg-5 shadow">
                    <h2 className="text-center m-4">Register SalesRef</h2>

                    <form>
                        <div className="mb-3">
                            <label htmlFor="SalesRefname" className="form-label">
                                SalesRef Name
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter your salesRefname"
                                name="name"
                                value={name}
                                /*onChange={(e) => onInputChange(e)}*/
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Contact" className="form-label">
                                Contact
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter your contact"
                                name="contact"
                                value={contact}
                                /*onChange={(e) => onInputChange(e)}*/
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Email" className="form-label">
                                Email
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter your e-mail"
                                name="email"
                                value={email}
                                /*onChange={(e) => onInputChange(e)}*/
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
                                /*onChange={(e) => onInputChange(e)}*/
                            />
                        </div>
                        <button type="submit" className="obtn">
                            Submit
                        </button>
                        <Link className="bbtn" to="/d">
                            Cancel
                        </Link>
                    </form>
                </div>
            </div>

        </div>
    )
}