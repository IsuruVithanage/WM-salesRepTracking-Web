import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS
import {
    Container,
    Row,
    Col,
} from "react-bootstrap";
import { useJsApiLoader, GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import axios from "axios";

const center = { lat: 7.8731, lng: 80.7718 }; // Default center

export default function MapCustomer() {
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyDvERMXD4BvE5p8HSXK8wLBQI5BtwxVhdU", // Replace with your Google Maps API key
        libraries: ["geometry"],
    });

    const [map, setMap] = useState(/** @type google.maps.Map */ (null));
    const [locations, setLocations] = useState([]); // Array of location objects (latitude, longitude)
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [customer, setCustomer] = useState(null);
    const [customerDetails, setCustomerDetails] = useState([]);

    useEffect(() => {
        axios.get(`https://maxol-sales-rep-track-api-akk9s.ondigitalocean.app/getCustomerLocations`, {
            headers:{
                'access-token' : localStorage.getItem("token")
            }

        })
            .then(response => {
                setLocations(response.data);
            })
            .catch(error => {
                console.error("Error loading locations:", error);
            });

        axios.get(`https://maxol-sales-rep-track-api-akk9s.ondigitalocean.app/getAllCustomerDetails`, {
            headers:{
                'access-token' : localStorage.getItem("token")
            }

        })
            .then(response => {
                setCustomerDetails(response.data);
            })
            .catch(error => {
                console.error("Error loading locations:", error);
            });

    }, []);

    // Fetch customer details when a marker is clicked
    // Simulate fetching customer details when a marker is clicked
    const tolerance = 0.0001; // Adjust the tolerance as needed

    const fetchCustomerDetails = (location) => {
        console.log("Clicked Location:", location);

        const matchingCustomer = customerDetails.find((customer) => {
            const latMatch = Math.abs(customer.lat - location.lat) < tolerance;
            const lngMatch = Math.abs(customer.lng - location.lng) < tolerance;

            console.log("Customer:", customer);
            console.log("Lat Match:", latMatch);
            console.log("Lng Match:", lngMatch);

            return latMatch && lngMatch;
        });

        if (matchingCustomer) {
            setCustomer(matchingCustomer);
        } else {
            console.log("Customer not found for location:", location);
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
                                    <th>Address:</th>
                                    <td>{customer.address}</td>
                                </tr>
                                {/* Add more customer details here */}
                                </tbody>
                            </Table>
                        ) : (
                            <p>Select a marker to view customer details</p>
                        )}
                    </div>
                </Col>
                <Col sm={8}>
                    <div className="position-relative" style={{ height: "100vh" }}>
                        {/* Google Map Box */}
                        <GoogleMap
                            center={center}
                            zoom={12}
                            mapContainerStyle={{ width: "100%", height: "100%" }}
                            options={{
                                zoomControl: true,
                                streetViewControl: true,
                                mapTypeControl: true,
                                fullscreenControl: true,
                            }}
                            onLoad={(map) => setMap(map)}
                        >
                            {locations.map((location, index) => {
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
