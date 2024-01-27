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

export default function ViewAllReps() {
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyDyS9bX9HjvrbKccqFsnuuxn_E5eh3x21I", // Replace with your Google Maps API key
        libraries: ["geometry"],
    });

    const [map, setMap] = useState(/** @type google.maps.Map */ (null));
    const [locations, setLocations] = useState([]); // Array of location objects (latitude, longitude)
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [rep, setRep] = useState(null);
    const [repDetails, setRepDetails] = useState([]);

    useEffect(() => {
        axios.get(`https://maxol-sales-rep-track-api-akk9s.ondigitalocean.app/getRepLatestLocation`, {
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


    }, []);

    // Fetch rep details when a marker is clicked
    // Simulate fetching rep details when a marker is clicked
    const tolerance = 0.0001; // Adjust the tolerance as needed

    const fetchRepDetails = (location) => {
        console.log("Clicked Location:", location);

        const matchingRep = locations.find((rep) => {
            const latMatch = Math.abs(rep.lat - location.lat) < tolerance;
            const lngMatch = Math.abs(rep.lng - location.lng) < tolerance;

            console.log("Rep:", rep);
            console.log("Lat Match:", latMatch);
            console.log("Lng Match:", lngMatch);

            return latMatch && lngMatch;
        });

        if (matchingRep) {
            setRep(matchingRep);
        } else {
            setRep(null);
            console.log("Rep not found for location:", location);
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
                        {rep ? (
                            <Table striped bordered hover responsive>
                                <tbody>
                                <tr>
                                    <th>Name:</th>
                                    <td>{rep.name}</td>
                                </tr>
                                <tr>
                                    <th>Contact:</th>
                                    <td>{rep.mobileNo}</td>
                                </tr>
                                <tr>
                                    <th>Address:</th>
                                    <td>{rep.address}</td>
                                </tr>
                                {/* Add more rep details here */}
                                </tbody>
                            </Table>
                        ) : (
                            <p>Select a marker to view rep details</p>
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
                                const label = locations[index].name;
                                return (
                                    <Marker
                                        key={index}
                                        position={location}
                                        icon={{
                                            url: `data:image/svg+xml;charset=UTF-8,` +
                                                `<svg width='120' height='40' xmlns='http://www.w3.org/2000/svg'>` +
                                                `<rect width='120' height='40' rx='10' ry='10' fill='white' stroke='orange' stroke-width='2'/>` +
                                                `<text x='50%' y='50%' alignment-baseline='middle' text-anchor='middle' font-size='12' fill='black' >${label}</text>` +
                                                `</svg>`,
                                            scaledSize: new window.google.maps.Size(120, 40),
                                        }}
                                        onClick={() => {
                                            setSelectedLocation(location);
                                            fetchRepDetails(location); // Fetch rep details when a marker is clicked
                                        }}
                                    />
                                );
                            })}
                            {selectedLocation && (
                                <InfoWindow
                                    position={selectedLocation}
                                    onCloseClick={() => {
                                        setSelectedLocation(null);
                                        setRep(null); // Close InfoWindow and reset rep details
                                    }}
                                >
                                    <div>
                                        <div style={{ backgroundColor: 'white', padding: '5px', borderRadius: '5px' }}>
                                            <p>{rep ? rep.name : null}</p>
                                        </div>
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
