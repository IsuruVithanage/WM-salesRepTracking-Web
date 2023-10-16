import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function SalesLeaderDetails() {
    const [salesLeader, setSalesLeader] = useState([]);

    /*useEffect(() => {
        loadSalesLeader();

    }, []);

    const loadSalesLeader = async () => {
        const result = await axios.get("http://localhost:8080/api/v1/salesLeader/getSalesLeader");
        setSalesLeader(result.data);
    }

    const deleteDoctor = async (id) => {
        await axios.delete(`http://localhost:8080/api/v1/salesLeader/deleteDoctor/${id}`);
        loadSalesLeader();
    }*/

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
                        <th scope="col">Email</th>
                        <th scope="col">Address</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {salesLeader.map((salesLeader) => (
                        <tr key={salesLeader.id}>
                            <td>{salesLeader.id}</td>
                            <td>{salesLeader.name}</td>
                            <td>{salesLeader.contact}</td>
                            <td>{salesLeader.email}</td>
                            <td>{salesLeader.specialization}</td>
                            <td>
                                <Link className="btn btn-sm btn-outline-primary mx-1" to={`/updateDoc/${salesLeader.id}`}>
                                    Edit
                                </Link>
                                <button
                                    className="btn btn-sm btn-outline-danger mx-1"
                                >
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
