import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS
import {
    Container,
    Row,
    Col,
} from "react-bootstrap";
import { useJsApiLoader, GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";

const center = { lat: 48.8584, lng: 2.2945 }; // Default center

export default function MapCustomer() {
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyDvERMXD4BvE5p8HSXK8wLBQI5BtwxVhdU", // Replace with your Google Maps API key
        libraries: ["geometry"],
    });

    const [map, setMap] = useState(/** @type google.maps.Map */ (null));
    const [locations, setLocations] = useState([]); // Array of location objects (latitude, longitude)
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [customerDetails, setCustomerDetails] = useState(null);

    useEffect(() => {
        // Simulate fetching location data from the database
        // In a real application, replace this with an API call to retrieve actual data
        const fetchedLocations = [
            { lat: 48.8588443, lng: 2.2943506 }, // Eiffel Tower
            { lat: 48.856614, lng: 2.3522219 },  // Louvre Museum
            { lat: 48.8614221, lng: 2.3325203 }, // Notre-Dame Cathedral
        ];

        setLocations(fetchedLocations);
    }, []);

    // Simulate fetching customer details when a marker is clicked
    const fetchCustomerDetails = (location) => {
        // In a real application, make an API request to get customer details based on the location
        // Update the customerDetails state with the fetched data
        setCustomerDetails("nimal");
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
                        {customerDetails ? (
                            <Table striped bordered hover responsive>
                                <tbody>
                                <tr>
                                    <th>Name:</th>
                                    <td>{customerDetails.name}</td>
                                </tr>
                                <tr>
                                    <th>Contact:</th>
                                    <td>{customerDetails.contact}</td>
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
                                        setCustomerDetails(null); // Close InfoWindow and reset customer details
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
