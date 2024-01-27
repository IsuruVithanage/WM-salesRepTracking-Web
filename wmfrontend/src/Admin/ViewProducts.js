import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import Swal from "sweetalert2";

export default function ViewProducts() {
    let navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const [newProductName, setNewProductName] = useState({
        productName: "",
    });

    useEffect(() => {
        loadProductData();

    }, []);

    const loadProductData = async () => {
        const result = await axios.get(`https://maxol-sales-rep-track-api-akk9s.ondigitalocean.app/getProducts`,{
            headers:{
                'access-token' : localStorage.getItem("token")
            }

        });

        if (result.data === "Not authenticated" || result.data === "we need token") {

            Swal.fire('Not Authenticated', 'You are not authenticated.', 'error');
            navigate('/');
            return;
        }
        console.log(result.data);
        setProducts(result.data);
    }
    const deleteProducts = (id) => {
        // Show a confirmation dialog
        Swal.fire({
            title: 'Delete Product',
            text: 'Are you sure you want to delete this product?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it',
        }).then(async (result) => {
            if (result.isConfirmed) {
                // User confirmed the deletion, send the delete request
                try {
                    await axios.delete(`https://maxol-sales-rep-track-api-akk9s.ondigitalocean.app/deleteProducts/${id}`,{
                        headers:{
                            'access-token' : localStorage.getItem("token")
                        }

                    } );
                    // User feedback for successful deletion
                    Swal.fire('Deleted!', 'The user has been deleted.', 'success');
                    // Reload the sales data
                    loadProductData();
                } catch (error) {
                    // Handle error, show an error alert
                    Swal.fire('Error', 'An error occurred while deleting the user.', 'error');
                }
            }
        });
    };

    const handleInputChange = (e) => {
        setNewProductName(e.target.value);
    };

    const addProduct = async () => {

        if (selectedProduct){
            Swal.fire({
                title: 'Are you sure?',
                text: "You want to Save this!!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Save it!'
            }).then(async (result) => {
                const requestData = {
                    id: selectedProduct.id,
                    productName: newProductName
                };

                try {
                    // Make a request to add the new product to the database
                    await axios.put(
                        "https://maxol-sales-rep-track-api-akk9s.ondigitalocean.app/updateProducts", requestData, // Ensure data is in the correct format
                        {
                            headers: {
                                "access-token": localStorage.getItem("token"),
                            },
                        }
                    );

                    // Show a success alert
                    await Swal.fire("Added!", "The product has been added.", "success");

                    setNewProductName({ productName: "" });
                    setSelectedProduct(null);

                    // Reload the products data
                    await loadProductData();
                } catch (error) {
                    // Handle error, show an error alert
                    await Swal.fire("Error", "An error occurred while adding the product.", "error");
                }
            });

        }else {
            Swal.fire({
                title: 'Are you sure?',
                text: "You want to Save this!!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Save it!'
            }).then(async (result) => {
                try {
                    // Make a request to add the new product to the database
                    await axios.post(
                        "https://maxol-sales-rep-track-api-akk9s.ondigitalocean.app/saveProducts", { productName: newProductName }, // Ensure data is in the correct format
                        {
                            headers: {
                                "access-token": localStorage.getItem("token"),
                            },
                        }
                    );

                    // Show a success alert
                    await Swal.fire("Added!", "The product has been added.", "success");

                    // Clear the input field
                    setNewProductName({ productName: "" });

                    // Reload the products data
                    await loadProductData();
                } catch (error) {
                    // Handle error, show an error alert
                    await Swal.fire("Error", "An error occurred while adding the product.", "error");
                }
            });

        }


    };

    const editProduct = (product) => {
        setSelectedProduct(product);
        setNewProductName({ productName: product.productName });
    };


    function restAll() {
        setNewProductName({ productName: "" });
        setSelectedProduct(null);
    }

    return (
        <div className="container">
            <div className="py-4">
                <div style={{ display: "flex", alignItems: "center", marginBottom: "20px", marginLeft: "1em", marginRight: "1em" , fontWeight: "bolder"}}>
                    <h3></h3>
                    <label htmlFor="SalesRefname" className="form-label">
                        {selectedProduct ? "Update Product" : "Add Product"}
                    </label>
                    <input
                        type="text"
                        className={`form-control`}
                        placeholder="Enter product name"
                        value={newProductName.productName}
                        onChange={handleInputChange}
                    />
                    <button className="obtn" onClick={addProduct}>
                        {selectedProduct ? "Update" : "Add"}
                    </button>
                    <button className="bbtn" onClick={restAll}>
                        Cancel
                    </button>
                </div>
                <table className="table border shadow">
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Time</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.productName}</td>
                            <td>{product.timeStamp}</td>
                            <td>
                                <button className="btn btn-sm btn-outline-primary mx-1" onClick={() => editProduct(product)}>
                                    Edit
                                </button>
                                <button className="btn btn-sm btn-outline-danger mx-1" onClick={() => deleteProducts(product.id)}>
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
