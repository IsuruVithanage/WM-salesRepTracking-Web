import React, {useEffect, useState} from "react";
import {Button, Form, Table} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS
import {
    Container,
    Row,
    Col,
} from "react-bootstrap";
import {useJsApiLoader, GoogleMap, Marker, InfoWindow} from "@react-google-maps/api";
import axios from "axios";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";

const center = {lat: 7.8731, lng: 80.7718}; // Default center
const libraries = ["geometry"];

export default function MapCustomer() {
    let navigate = useNavigate();

    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyDyS9bX9HjvrbKccqFsnuuxn_E5eh3x21I", // Replace with your Google Maps API key
        libraries: libraries,
    });


    const [map, setMap] = useState(/** @type google.maps.Map */ (null));
    const [locations, setLocations] = useState([]); // Array of location objects (latitude, longitude)
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [customer, setCustomer] = useState(null);
    const [customerDetails, setCustomerDetails] = useState([]);
    const [repVisit, setRapVisits] = useState(null);
    const [salesQTY, setSalesQTY] = useState(null);
    const [allReps, setAllReps] = useState([]);
    const [selectedRep, setSelectedRep] = useState(null);


    useEffect(() => {
        axios.get(`https://maxol-sales-rep-track-api-akk9s.ondigitalocean.app/getCustomerLocations`, {
            headers: {
                'access-token': localStorage.getItem("token")
            }

        })
            .then(response => {
                setLocations(response.data);
            })
            .catch(error => {
                console.error("Error loading locations:", error);
            });

        axios.get(`https://maxol-sales-rep-track-api-akk9s.ondigitalocean.app/getAllCustomerDetails`, {
            headers: {
                'access-token': localStorage.getItem("token")
            }

        })
            .then(response => {
                setCustomerDetails(response.data);
            })
            .catch(error => {
                console.error("Error loading locations:", error);
            });

        axios.get(`https://maxol-sales-rep-track-api-akk9s.ondigitalocean.app/getAllReps`, {
            headers: {
                'access-token': localStorage.getItem("token")
            }

        })
            .then(response => {
                setAllReps(response.data);
            })
            .catch(error => {
                console.error("Error loading locations:", error);
            });
    }, []);

    const getCustomer = () => {
        axios.get(`https://maxol-sales-rep-track-api-akk9s.ondigitalocean.app/getAllCustomerDetails`, {
            headers: {
                'access-token': localStorage.getItem("token")
            }

        })
            .then(response => {
                setCustomerDetails(response.data);
            })
            .catch(error => {
                console.error("Error loading locations:", error);
            });

    }

    // Fetch customer details when a marker is clicked
    // Simulate fetching customer details when a marker is clicked
    const tolerance = 0.0001; // Adjust the tolerance as needed

    const getRepVisits = (id) => {
        axios.get(`https://maxol-sales-rep-track-api-akk9s.ondigitalocean.app/getNoOfTimeRepVisited/${id}`, {
            headers: {
                'access-token': localStorage.getItem("token")
            }

        })
            .then(response => {
                setRapVisits(response.data[0].noOfTimeRepVisited);
            })
            .catch(error => {
                console.error("Error loading locations:", error);
            });

    }

    const getSalesQTY = (id) => {
        axios.get(`https://maxol-sales-rep-track-api-akk9s.ondigitalocean.app/saleForGivenCustomer/${id}`, {
            headers: {
                'access-token': localStorage.getItem("token")
            }

        })
            .then(response => {
                console.log(response.data[0].allSales);
                setSalesQTY(response.data[0].allSales);
            })
            .catch(error => {
                console.error("Error loading locations:", error);
            });

    }


    const fetchCustomerDetails = (location) => {
        console.log("Clicked Location:", location);

        const matchingCustomer = customerDetails.find((customer) => {
            const latMatch = Math.abs(customer.lat - location.lat) < tolerance;
            const lngMatch = Math.abs(customer.lng - location.lng) < tolerance;

            return latMatch && lngMatch;
        });

        if (matchingCustomer) {
            getSalesQTY(matchingCustomer.id);
            getRepVisits(matchingCustomer.repId);
            setCustomer(matchingCustomer);
            setSelectedRep(getRepName(matchingCustomer.repId,allReps))
        } else {
            console.log("Customer not found for location:", location);
        }
    };


    const handleRepChange = (event) => {
        setSelectedRep(event.target.value);
    }

    const saveRepChange = async (event) => {
        event.preventDefault();
        Swal.fire({
            title: 'Change Rep',
            text: 'Are you sure you want to change Rep?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Change',
        }).then(async (result) => {
            if (selectedRep) {
                const requestData = {
                    id: customer.id,
                    repId: getRepId(selectedRep,allReps)
                };

                console.log(requestData);

                try {
                    await axios.put(`https://maxol-sales-rep-track-api-akk9s.ondigitalocean.app/updateRep`, requestData, {
                        headers: {
                            'access-token': localStorage.getItem("token")
                        }
                    });
                    await Swal.fire({
                        title: 'Saved!',
                        text: 'SalesRep saved successfully!',
                        icon: 'success',
                    });
                    getCustomer();



                } catch (error) {
                    console.error("Error updating rep:", error);
                }
            }
        });


    };


    const getRepName = (repId, array) => {
        const rep = array.find(rep => rep.id === repId);

        if (rep) {
            return rep.name;
        } else {
            console.error('Customer not found for ID:', repId);
            return null;
        }
    };

    const getRepId = (name, array) => {
        console.log("Searching for rep with name:", name);

        const rep = array.find(rep => {
            console.log("Current rep name:", rep.name);
            return rep.name.trim()  === name.trim() ;
        });

        if (rep) {
            console.log("Found rep:", rep);
            return rep.id;
        } else {
            console.error('Rep not found for name:', name);
            return null;
        }
    };


    if (!isLoaded || loadError) {
        return <p>Loading... Please wait.</p>;
    }

    return (
        <Container className="alog">
            <Row>
                <Col sm={4}>
                    <div className="p-4 h-100 bg-white shadow">
                        {/* Details Side */}
                        <h2>DETAILS</h2>
                        {customer ? (
                            <div>
                                <Table striped bordered hover responsive>
                                    <tbody>
                                    <tr>
                                        <th>Name:</th>
                                        <td>{customer.name}</td>
                                    </tr>
                                    <tr>
                                        <th>Contact:</th>
                                        <td>{customer.mobileNo}</td>
                                    </tr>
                                    <tr>
                                        <th>Additional Contact:</th>
                                        <td>{customer.additionalNo}</td>
                                    </tr>
                                    <tr>
                                        <th>Email:</th>
                                        <td>{customer.eMail}</td>
                                    </tr>
                                    <tr>
                                        <th>Address:</th>
                                        <td>{customer.address}</td>
                                    </tr>
                                    <tr>
                                        <th>Postal Code:</th>
                                        <td>{customer.postalCode}</td>
                                    </tr>
                                    <tr>
                                        <th>Province:</th>
                                        <td>{customer.province}</td>
                                    </tr>
                                    <tr>
                                        <th>District:</th>
                                        <td>{customer.district}</td>
                                    </tr>
                                    <tr>
                                        <th>Is WM Customer:</th>
                                        <td>{customer.wmCustomerOrNot}</td>
                                    </tr>
                                    <tr>
                                        <th>Machine Type:</th>
                                        <td>{customer.typeOfMachine}</td>
                                    </tr>
                                    <tr>
                                        <th>Social Media:</th>
                                        <td>{customer.socialMediaLinks}</td>
                                    </tr>
                                    <tr>
                                        <th>Sales:</th>
                                        <td>{salesQTY}</td>
                                    </tr>
                                    <tr>
                                        <th>Visits:</th>
                                        <td>{repVisit}</td>
                                    </tr>

                                    </tbody>
                                </Table>
                                <Form>
                                    <Form.Group controlId="repSelect">
                                        <Form.Label>Select Rep:</Form.Label>
                                        <Form.Control as="select" value={selectedRep} onChange={handleRepChange}>
                                            {allReps.map((rep) => (
                                                <option key={rep.repId} value={rep.repId}>
                                                    {rep.name}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                    <button className='obtn' onClick={(event) => saveRepChange(event)}>
                                        Save Rep Change
                                    </button>
                                </Form>
                            </div>
                        ) : (
                            <p>Select a marker to view customer details</p>
                        )}
                    </div>
                </Col>
                <Col sm={8}>
                    <div className="position-relative" style={{height: "100vh"}}>
                        {/* Google Map Box */}
                        <GoogleMap
                            center={center}
                            zoom={12}
                            mapContainerStyle={{width: "100%", height: "100%"}}
                            options={{
                                zoomControl: true,
                                streetViewControl: true,
                                mapTypeControl: true,
                                fullscreenControl: true,
                            }}
                            onLoad={(map) => setMap(map)}
                        >
                            {locations && Array.isArray(locations) && locations.map((location, index) => {
                                const label = index === 0 ? "A" : index === locations.length - 1 ? "B" : "";
                                return (
                                    <Marker
                                        key={index}
                                        position={location}
                                        label={label}
                                        onClick={() => {
                                            setSelectedLocation(location);
                                            fetchCustomerDetails(location); // Fetch customer details when a marker is clicked
                                        }}
                                    />
                                );
                            })}
                            {selectedLocation && (
                                <InfoWindow
                                    position={selectedLocation}
                                    onCloseClick={() => {
                                        setSelectedLocation(null);
                                        setCustomer(null); // Close InfoWindow and reset customer details
                                    }}
                                >
                                    <div>
                                        <p>Location {String.fromCharCode(65 + locations.indexOf(selectedLocation))}</p>
                                    </div>
                                </InfoWindow>
                            )}
                        </GoogleMap>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}