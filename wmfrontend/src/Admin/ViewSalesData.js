import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import Swal from "sweetalert2";


export default function ViewSalesData() {
    let navigate = useNavigate();
    const [sales, setSales] = useState([]);
    const [filteredSales, setFilteredSales] = useState([]);
    const [searchRepName, setSearchRepName] = useState("");
    const [searchDate, setSearchDate] = useState("");
    const [searchCustomerMobile, setSearchCustomerMobile] = useState("");


    useEffect(() => {
        loadSales();

    }, []);

    const loadSales = async () => {
        try {
            const result = await axios.get("https://maxol-sales-rep-track-api-akk9s.ondigitalocean.app/getSalesData", {
                headers: {
                    'access-token': localStorage.getItem("token")
                }
            });

            if (result.data === "Not authenticated" || result.data === "we need token") {
                // Show an alert
                Swal.fire('Not Authenticated', 'You are not authenticated.', 'error');
                // Redirect to the main page or handle as needed
                navigate('/');
                return;  // Exit the function to prevent further execution
            }

            // Sort the sales data by date and time in descending order
            const sortedSales = result.data.sort((a, b) => new Date(b.time) - new Date(a.time));
            console.log(sortedSales)

            setSales(sortedSales);
            setFilteredSales(sortedSales);
        } catch (error) {
            console.error("Error loading sales data:", error);
        }
    }


    function searchSaleDate(id) {
        axios.get(`https://maxol-sales-rep-track-api-akk9s.ondigitalocean.app/chechEnteredDate/${id}`, {
            headers:{
                'access-token' : localStorage.getItem("token")
            }
        })
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

    const searchSalesByRepName = () => {
        const filteredData = sales.filter(sale => sale.repUserName.toLowerCase().includes(searchRepName.toLowerCase()));
        setFilteredSales(filteredData);
    }

    const searchSalesByDate = () => {
        const filteredData = sales.filter(sale => sale.time.includes(searchDate));
        setFilteredSales(filteredData);
    }

    const searchSalesByCustomerMobile = () => {
        const filteredData = sales.filter(sale => sale.mobileNo.includes(searchCustomerMobile));
        setFilteredSales(filteredData);
    }

    const resetFilters = () => {
        setFilteredSales(sales); // Reset filteredSales to the original sales data
        setSearchRepName("");
        setSearchDate("");
        setSearchCustomerMobile("");
    }

    return (
        <div className="container">
            <div className="py-4">
                <div style={{display:"flex", alignItems: "center", marginLeft:'20px',overflow:"hidden"}}>
                    <input
                        type="text"
                        className={`form-control`}
                        placeholder="Enter Sales Rep Name"
                        value={searchRepName}
                        onChange={(e) => setSearchRepName(e.target.value)}
                    />
                    <button className="obtn" onClick={searchSalesByRepName}>
                        Search
                    </button>

                    <input
                        type="text"
                        className={`form-control`}
                        placeholder="Enter Date (YYYY-MM-DD)"
                        value={searchDate}
                        onChange={(e) => setSearchDate(e.target.value)}
                    />
                    <button className="obtn" onClick={searchSalesByDate}>
                        Search
                    </button>

                    <input
                        type="text"
                        className={`form-control`}
                        placeholder="Enter Customer Mobile"
                        value={searchCustomerMobile}
                        onChange={(e) => setSearchCustomerMobile(e.target.value)}
                    />
                    <button className="obtn" onClick={searchSalesByCustomerMobile}>
                        Search
                    </button>

                    <button className="btn btn-sm btn-outline-secondary" onClick={resetFilters}>
                        Reset Filters
                    </button>
                </div>
                <table className="table border shadow">
                    <thead>
                    <tr>
                        <th scope="col">Item Name</th>
                        <th scope="col">QTY</th>
                        <th scope="col">SalesRep Name</th>
                        <th scope="col">SalesRep Contact</th>
                        <th scope="col">Customer Name</th>
                        <th scope="col">Customer Number</th>
                        <th scope="col">Customer Address</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Date and Time</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        filteredSales.map((sales) => (
                            <tr>
                                <td>{sales.itemName}</td>
                                <td>{sales.qty}</td>
                                <td>{sales.repUserName}</td>
                                <td>{sales.userMobile}</td>
                                <td>{sales.name}</td>
                                <td>{sales.mobileNo}</td>
                                <td>{sales.address}</td>
                                <td>{sales.amount}</td>
                                <td>{sales.time}</td>
                                <td>
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