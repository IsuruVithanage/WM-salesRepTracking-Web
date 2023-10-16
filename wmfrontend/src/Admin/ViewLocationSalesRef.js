import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import NavBar from "../Layout/NavBar";


export default function ViewLocationSalesRef() {
    const [sales, setSales] = useState([]);

    /*useEffect(() => {
        loadSales();

    }, []);

    const loadSales = async () => {
        const result = await axios.get("http://localhost:8080/api/v1/sales/getSales");
        setSales(result.data);
    }

    const deleteDoctor = async (id) => {
        await axios.delete(`http://localhost:8080/api/v1/sales/deleteDoctor/${id}`);
        loadSales();
    }*/

    return (
        <div className="container">
            <div className="py-4">
                <table className="table border shadow">
                    <thead>
                    <tr>
                        <th scope="col">SalesRep ID</th>
                        <th scope="col">SalesRep Name</th>
                        <th scope="col">Contact</th>
                        <th scope="col">Customer Name</th>
                        <th scope="col">Customer Address</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        sales.map((sales) => (
                            <tr>
                                <td>{sales.id}</td>
                                <td>{sales.name}</td>
                                <td>{sales.contact}</td>
                                <td>{sales.email}</td>
                                <td>{sales.specialization}</td>
                                <td>
                                    <Link className="btn btn-sm btn-outline-primary mx-1"
                                          to={`/updateDoc/${sales.id}`}>Edit</Link>
                                    <button className="btn btn-sm btn-outline-danger mx-1"
                                        /*onClick={() => deleteDoctor(sales.id)}*/>Delete
                                    </button>
                                </td>
                            </tr>

                        ))
                    }
                    </tbody>
                </table>
            </div>

        </div>
    )
}