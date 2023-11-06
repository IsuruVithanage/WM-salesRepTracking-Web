import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import Swal from "sweetalert2";


export default function ViewSalesData() {
    let navigate = useNavigate();
    const [sales, setSales] = useState([]);
    const [repContacts, setRepContacts] = useState({});


    useEffect(() => {
        loadSales();
        fetchRepContacts();

    }, []);

    const loadSales = async () => {
        const result = await axios.get("https://maxol-sales-rep-track-api-akk9s.ondigitalocean.app/getSalesData");
        setSales(result.data);
    }

    const fetchRepContacts = async () => {
        try {
            const response = await axios.get("https://maxol-sales-rep-track-api-akk9s.ondigitalocean.app/getrepContact");
            const repContactData = response.data;

            // Convert the response data into an object with repId as keys
            const contacts = {};
            repContactData.forEach((contact) => {
                contacts[contact.id] = contact.mobileNo;
            });

            setRepContacts(contacts);
        } catch (error) {
            console.error("Error loading rep contacts:", error);
        }
    };

    function searchSaleDate(id) {
        axios.get(`https://maxol-sales-rep-track-api-akk9s.ondigitalocean.app/chechEnteredDate/${id}`)
            .then(response => {
                console.log(response.data);
                if (response.data){
                    navigate(`/salesData/${id}`);
                }else {
                    Swal.fire("Error!", "This data is overdue", "error");
                }
            })
            .catch(error => {
                console.error("Error loading sales data:", error);
            });
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
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        sales.map((sales) => (
                            <tr>
                                <td>{sales.itemName}</td>
                                <td>{sales.qty}</td>
                                <td>{sales.repId}</td>
                                <td>{repContacts[sales.repId]}</td>
                                <td>{sales.customerId}</td>
                                <td>{sales.amount}</td>
                                <td>{sales.time}</td>
                                <td>
                                    {/*<Link className="btn btn-sm btn-outline-primary mx-1"
                                          to={`/salesData/${sales.salesId}`}>Edit</Link>*/}
                                    <button className="btn btn-sm btn-outline-primary mx-1"
                                        onClick={() => searchSaleDate(sales.salesId)}>Update
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