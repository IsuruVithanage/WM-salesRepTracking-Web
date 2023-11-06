import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import Swal from "sweetalert2";

export default function SalesRefDetails() {
    const [salesRep, setSalesRep] = useState([]);

    useEffect(() => {
        loadSalesRef();

    }, []);

    const loadSalesRef = async () => {
        const result = await axios.get("https://maxol-sales-rep-track-api-akk9s.ondigitalocean.app/getAllReps");
        setSalesRep(result.data);
    }

    const deleteSalesRep = (id) => {
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
                    await axios.put(`https://maxol-sales-rep-track-api-akk9s.ondigitalocean.app/deletUser/${id}`);
                    // User feedback for successful deletion
                    await Swal.fire('Deleted!', 'The user has been deleted.', 'success');
                    // Reload the sales data
                    await loadSalesRef();
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
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px",
                    marginLeft: "1em",
                    marginRight: "1em",
                    fontWeight: "bolder"
                }}>
                    <h3></h3>
                    <Link to="/addSalesRef" className="obtn">Add Sales Ref</Link>
                </div>
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
                    {
                        salesRep.map((salesRefs) => (
                            <tr>
                                <td>{salesRefs.id}</td>
                                <td>{salesRefs.name}</td>
                                <td>{salesRefs.mobileNo}</td>
                                <td>{salesRefs.address}</td>
                                <td>{salesRefs.managerId}</td>
                                <td>
                                    <Link className="btn btn-sm btn-outline-primary mx-1" to={`/UserUpdate/${salesRefs.id}`}>
                                        Edit
                                    </Link>
                                    <button className="btn btn-sm btn-outline-danger mx-1" onClick={() => deleteSalesRep(salesRefs.id)}>
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
