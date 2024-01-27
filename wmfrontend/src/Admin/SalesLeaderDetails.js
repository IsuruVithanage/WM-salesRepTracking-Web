import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import Swal from "sweetalert2";

export default function SalesLeaderDetails() {
    let navigate = useNavigate();
    const [salesLeader, setSalesLeader] = useState([]);

    useEffect(() => {
        loadSalesLeader();

    }, []);

    const loadSalesLeader = async () => {
        const result = await axios.get(`https://maxol-sales-rep-track-api-akk9s.ondigitalocean.app/getSalesLeaders`,{
            headers:{
                'access-token' : localStorage.getItem("token")
            }

        });

        if (result.data === "Not authenticated" || result.data === "we need token") {
            // Show an alert
            Swal.fire('Not Authenticated', 'You are not authenticated.', 'error');
            // Redirect to the main page or handle as needed
            navigate('/');
            return;  // Exit the function to prevent further execution
        }
        setSalesLeader(result.data);
    }
    const deleteSalesLeader = (id) => {
        // Show a confirmation dialog
        Swal.fire({
            title: 'Delete User',
            text: 'Are you sure you want to delete this user?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it',
        }).then(async (result) => {
            if (result.isConfirmed) {
                // User confirmed the deletion, send the delete request
                try {
                    await axios.put(`https://maxol-sales-rep-track-api-akk9s.ondigitalocean.app/deletUser/${id}`,{
                        headers:{
                            'access-token' : localStorage.getItem("token")
                        }

                    } );
                    // User feedback for successful deletion
                    Swal.fire('Deleted!', 'The user has been deleted.', 'success');
                    // Reload the sales data
                    loadSalesLeader();
                } catch (error) {
                    // Handle error, show an error alert
                    Swal.fire('Error', 'An error occurred while deleting the user.', 'error');
                }
            }
        });
    };


    return (
        <div className="container">
            <div className="py-4">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", marginLeft: "1em", marginRight: "1em" , fontWeight: "bolder"}}>
                    <h3></h3>
                    <Link to="/addSalesLeader" className="obtn">Add Sales Leader</Link>
                </div>
                <table className="table border shadow">
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Contact</th>
                        <th scope="col">Address</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {salesLeader.map((salesLeader) => (
                        <tr key={salesLeader.id}>
                            <td>{salesLeader.id}</td>
                            <td>{salesLeader.name}</td>
                            <td>{salesLeader.mobileNo}</td>
                            <td>{salesLeader.address}</td>
                            <td>
                                <Link className="btn btn-sm btn-outline-primary mx-1" to={`/leaderUpdate/${salesLeader.id}`}>
                                    Edit
                                </Link>
                                <button className="btn btn-sm btn-outline-danger mx-1" onClick={() => deleteSalesLeader(salesLeader.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
