import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS
import {
    Container,
    Row,
    Col,
} from "react-bootstrap";
import { useJsApiLoader, GoogleMap, Marker, InfoWindow, Polyline } from "@react-google-maps/api";

const center = { lat: 48.8584, lng: 2.2945 }; // Default center

function MapComponent() {
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyDvERMXD4BvE5p8HSXK8wLBQI5BtwxVhdU", // Replace with your Google Maps API key
        libraries: ["geometry"],
    });

    const [map, setMap] = useState(/** @type google.maps.Map */ (null));
    const [locations, setLocations] = useState([]); // Array of location objects (latitude, longitude)
    const [selectedLocation, setSelectedLocation] = useState(null);

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

    if (!isLoaded || loadError) {
        return <p>Loading... Please wait.</p>;
    }

    // Connect the locations in order to create a route from the first location to the last
    const polylinePath = locations.map((location) => new window.google.maps.LatLng(location.lat, location.lng));

    return (
        <Container className="alog">
            <Row>
                <Col sm={4}>
                    <div className="p-4 h-100 bg-white shadow">
                        {/* Details Side */}
                        <h2>DETAILS</h2>
                        <Table striped bordered hover responsive>
                            <tbody>
                            <tr>
                                <th>Sales Ref:</th>
                                <td>Nimal</td>
                            </tr>
                            <tr>
                                <th>Contact:</th>
                                <td>07765364</td>
                            </tr>
                            <tr>
                                <th>Customer:</th>
                                <td>Kamal</td>
                            </tr>
                            <tr>
                                <th>Address:</th>
                                <td>Galle</td>
                            </tr>
                            <tr>
                                <th>Item:</th>
                                <td>AASS345</td>
                            </tr>
                            <tr>
                                <th>Quantity:</th>
                                <td>5</td>
                            </tr>
                            </tbody>
                        </Table>
                        {/* Add details or any components you want */}
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
                                        }}
                                    />
                                );
                            })}
                            {selectedLocation && (
                                <InfoWindow
                                    position={selectedLocation}
                                    onCloseClick={() => {
                                        setSelectedLocation(null);
                                    }}
                                >
                                    <div>
                                        <p>Location {String.fromCharCode(65 + locations.indexOf(selectedLocation))}</p>
                                    </div>
                                </InfoWindow>
                            )}
                            {locations.length > 1 && (
                                <Polyline
                                    path={polylinePath}
                                    options={{
                                        strokeColor: "#FB6B0E", // Adjust the color as needed
                                        strokeOpacity: 1.0,
                                        strokeWeight: 2,
                                    }}
                                />
                            )}
                        </GoogleMap>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default MapComponent;
