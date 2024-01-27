import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom";
import Swal from "sweetalert2";


export default function RepHistory() {
    let navigate = useNavigate();
    const [sales, setSales] = useState([]);

    const {repId}=useParams();

    useEffect(() => {
        loadSales();

    }, []);

    const loadSales = async () => {
        const result = await axios.get(`https://maxol-sales-rep-track-api-akk9s.ondigitalocean.app/getSalesData/${repId}`, {
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
        setSales(result.data);
    }

    return (
        <div className="container">
            <div className="py-4">
                <table className="table border shadow">
                    <thead>
                    <tr>
                        <th scope="col">Item Name</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">SalesRep Name</th>
                        <th scope="col">SalesRep Contact</th>
                        <th scope="col">Customer</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Date and Time</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        sales.map((sales) => (
                            <tr>
                                <td>{sales.itemName}</td>
                                <td>{sales.qty}</td>
                                <td>{sales.name}</td>
                                <td>{sales.mobileNo}</td>
                                <td>{sales.customerId}</td>
                                <td>{sales.amount}</td>
                                <td>{sales.time}</td>
                            </tr>

                        ))
                    }
                    </tbody>
                </table>
            </div>

        </div>
    )
}