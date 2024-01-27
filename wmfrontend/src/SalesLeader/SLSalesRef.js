import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom";
import Swal from "sweetalert2";

export default function SLSalesRef() {
    let navigate = useNavigate();

    const [salesRef, setSalesRef] = useState([]);

    const { managerId } = useParams();

    useEffect(() => {
        loadSalesRef();

    }, []);

    const loadSalesRef = async () => {
        try {
            const result = await axios.get(`https://maxol-sales-rep-track-api-akk9s.ondigitalocean.app/getRepsByManager/${managerId}`, {
                headers:{
                    'access-token' : localStorage.getItem("token")
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
            setSalesRef(result.data);
        } catch (error) {
            console.error("Error loading salesRef:", error);
        }
    }


    return (
        <div className="container">
            <div className="py-4">
                <table className="table border shadow">
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Contact</th>
                        <th scope="col">Address</th>
                        <th scope="col">ManagerId</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {salesRef.map((salesRefs) => (
                        <tr>
                            <td>{salesRefs.id}</td>
                            <td>{salesRefs.name}</td>
                            <td>{salesRefs.mobileNo}</td>
                            <td>{salesRefs.address}</td>
                            <td>{salesRefs.managerId}</td>
                            <td>
                                <Link className="btn btn-sm btn-outline-primary mx-1" to={`/repHistory/${salesRefs.id}`}>
                                    History
                                </Link>
                                <Link className="btn btn-sm btn-outline-success mx-1" to={`/mapLocation/${salesRefs.id}`}>
                                    Location
                                </Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
