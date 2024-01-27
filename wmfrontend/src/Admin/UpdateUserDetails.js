import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function UpdateUserDetails() {
    let navigate = useNavigate();

    const {userId} = useParams();

    const [managers, setManagers] = useState([]);

    const [users, setUser] = useState({
        id: 0,
        name: "",
        userName: "",
        pw: "",
        mobileNo: "",
        address: "",
        type: "",
        managerId: 0
    });

    const {name, userName,pw, mobileNo, address, type, managerId} = users;
    const onInputChange = (e) => {
        setUser({
            ...users,
            [e.target.name]: e.target.type === 'number' ? parseInt(e.target.value, 10) : e.target.value
        });
    };


    useEffect(() => {
        loadUser();
        fetchManagerIds();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to Update this!!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Save it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await Swal.fire(
                    'Saved!',
                    'Your sales data has been updated.',
                    'success'
                )
                try {
                    await axios.put(`https://maxol-sales-rep-track-api-akk9s.ondigitalocean.app/updateUser`, users, {
                        headers: {
                            'access-token': localStorage.getItem("token")
                        }
                    });
                    navigate("/salesRef");
                } catch (error) {
                    // Handle error, show an error alert
                    Swal.fire('Error', 'An error occurred while updating the user.', 'error');
                }

            }
        })

    };


    const loadUser = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const result = await axios.get(`https://maxol-sales-rep-track-api-akk9s.ondigitalocean.app/getReps/${userId}`, {
                    headers: {
                        'access-token': localStorage.getItem("token")
                    }
                });
                console.log(result.data);

                if (result.data === "Not authenticated" || result.data === "we need token") {
                    // Show an alert
                    Swal.fire('Not Authenticated', 'You are not authenticated.', 'error');
                    // Redirect to the main page or handle as needed
                    navigate('/');
                    return;  // Exit the function to prevent further execution
                }
                setUser(result.data[0]);
            } catch (error) {
                // Handle error, show an error alert
                Swal.fire('Error', 'An error occurred while loading the user.', 'error');
            }
        }else {
            Swal.fire('Error', 'Token is expired, Please LogIn.', 'error');
            navigate('/adminLogin');
        }
    }

    const fetchManagerIds = async () => {
        try {
            const response = await axios.get("https://maxol-sales-rep-track-api-akk9s.ondigitalocean.app/getSalesLeaders", {
                headers: {
                    'access-token': localStorage.getItem("token")
                }
            });
            setManagers(response.data);
        } catch (error) {
            console.error("Error loading manager IDs:", error);
        }
    };

    return (
        <div className="container h-100 mx-auto">
            <div className="row h-100 justify-content-center align-items-center">
                <div className="col-md-5  border rounded p-4 mt-lg-5 shadow">
                    <h2 className="text-center m-2">Update SalesRep</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                Name
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter your repid"
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
                            <label htmlFor="pw" className="form-label">
                                Password
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter your password"
                                name="pw"
                                value={pw}
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
                                placeholder="Enter your item name"
                                name="mobileNo"
                                value={mobileNo}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="type" className="form-label">
                                Type
                            </label>
                            <select
                                className="form-select"
                                name="type"
                                value={type}
                                onChange={(e) => onInputChange(e)}
                            >
                                <option value={type}>{type}</option>
                                <option value="rep">rep</option>
                                <option value="leader">leader</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Address" className="form-label">
                                Address
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter your bank"
                                name="address"
                                value={address}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="managerId" className="form-label">
                                Manager Name
                            </label>
                            <select
                                className="form-control"
                                name="managerId"
                                value={managerId}
                                onChange={(e) => onInputChange(e)}
                            >
                                <option >
                                </option>
                                {managers.map((manager) => (
                                    <option key={manager.id} value={manager.id}>
                                        {manager.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button type="submit" className="obtn">
                            Submit
                        </button>
                        <Link className="bbtn" to="/salesRef">
                            Cancel
                        </Link>
                    </form>
                </div>
            </div>

        </div>
    )
}