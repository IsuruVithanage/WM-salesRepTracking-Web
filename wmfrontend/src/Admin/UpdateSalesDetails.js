import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function UpdateSalesDetails() {
    let navigate = useNavigate();

    const {id} = useParams();

    const [sales, setSales] = useState({
        salesId: 0,
        repId: 0,
        customerId: 0,
        itemName: "",
        qty: 0,
        paymentMethod: "",
        bank: "",
        branch: "",
        amount: 0,
        remarks: ""
    });

    const {repId, customerId, itemName, qty, paymentMethod, bank, branch, amount, remarks} = sales;
    const onInputChange = (e) => {
        setSales({...sales, [e.target.name]: e.target.value});
    };

    useEffect(() => {
        loadSales();
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
                await axios.put(`https://maxol-sales-rep-track-api-akk9s.ondigitalocean.app/updateSales`, sales, {
                    headers:{
                        'access-token' : localStorage.getItem("token")
                    }
                });
                navigate("/salesdata");
            }
        })

    };


    const loadSales = async () => {
        const result = await axios.get(`https://maxol-sales-rep-track-api-akk9s.ondigitalocean.app/SalesData/${id}`, {
            headers:{
                'access-token' : localStorage.getItem("token")
            }
        });
        console.log(result.data);
        setSales(result.data[0]);
    }

    return (
        <div className="container h-100 mx-auto">
            <div className="row h-100 justify-content-center align-items-center">
                <div className="col-md-5  border rounded p-4 mt-lg-5 shadow">
                    <h2 className="text-center m-2">Update SalesData</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="repId" className="form-label">
                                RepId
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter your repid"
                                name="repId"
                                value={repId}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="userName" className="form-label">
                                Customer Id
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter your customer Id"
                                name="customerId"
                                value={customerId}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="mobileNo" className="form-label">
                                Item Name
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter your item name"
                                name="itemName"
                                value={itemName}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Address" className="form-label">
                                QTY
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter your qty"
                                name="qty"
                                value={qty}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Address" className="form-label">
                                Payment Method
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter your payment method"
                                name="paymentMethod"
                                value={paymentMethod}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Address" className="form-label">
                                Bank
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter your bank"
                                name="bank"
                                value={bank}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Address" className="form-label">
                                Branch
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter your branch"
                                name="branch"
                                value={branch}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Address" className="form-label">
                                Amount
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter your amount"
                                name="amount"
                                value={amount}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Remarks" className="form-label">
                                Remark
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter your remark"
                                name="remarks"
                                value={remarks}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <button type="submit" className="obtn">
                            Submit
                        </button>
                        <Link className="bbtn" to="/salesData">
                            Cancel
                        </Link>
                    </form>
                </div>
            </div>

        </div>
    )
}