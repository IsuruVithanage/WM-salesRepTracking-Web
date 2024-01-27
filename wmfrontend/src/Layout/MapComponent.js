import React, {useEffect, useState} from "react";
import {Table} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS
import "../App.css"; // Import your CSS file
import {
    Container,
    Row,
    Col,
} from "react-bootstrap";
import {useJsApiLoader, GoogleMap, Marker, InfoWindow, Polyline} from "@react-google-maps/api";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import Swal from "sweetalert2";

let center = {lat: 7.8731, lng: 80.7718}; // Default center

function MapComponent() {
    let navigate = useNavigate();
    const {repId} = useParams();

    const {isLoaded, loadError} = useJsApiLoader({
        googleMapsApiKey: "AIzaSyDyS9bX9HjvrbKccqFsnuuxn_E5eh3x21I",
        libraries: ["geometry"],
    });

    const [map, setMap] = useState(/** @type google.maps.Map */ (null));
    const [locations, setLocations] = useState([]); // Array of location objects (latitude, longitude)
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [salesData, setSalesData] = useState([]);

    useEffect(() => {
        // Fetch location data from your server
        axios.get(`https://maxol-sales-rep-track-api-akk9s.ondigitalocean.app/getRepsLocation/${repId}`, {
            headers:{
                'access-token' : localStorage.getItem("token")
            }

        })
            .then(response => {
                console.log(response.data);

                if (response.data === "Not authenticated" || response.data === "we need token") {
                    // Show an alert
                    Swal.fire('Not Authenticated', 'You are not authenticated.', 'error');
                    // Redirect to the main page or handle as needed
                    navigate('/');
                    return;  // Exit the function to prevent further execution
                }
                setLocations(response.data);
            })
            .catch(error => {
                console.error("Error loading locations:", error);
            });

        axios
            .get(`https://maxol-sales-rep-track-api-akk9s.ondigitalocean.app/getSalesDataBydate/${repId}`, {
                headers:{
                    'access-token' : localStorage.getItem("token")
                }

            })
            .then((response) => {
                if (response.data.length === 0) {
                    Swal.fire("No Sales Data", "There's no sales data available.", "error");
                } else {
                    // Group sales data by date
                    const groupedSalesData = groupBy(response.data, 'date');

                    // Set sales data state
                    setSalesData(groupedSalesData);

                    console.log(groupedSalesData);
                }
            })
            .catch((error) => {
                console.error("Error loading sales data:", error);
            });

        /*axios.get(`https://maxol-sales-rep-track-api-akk9s.ondigitalocean.app/getrepContacts/${repId}`, {
            headers:{
                'access-token' : localStorage.getItem("token")
            }

        })
            .then(response => {
                setContact(response.data[0].mobileNo);
                console.log(response.data);
            })
            .catch(error => {
                console.error("Error loading sales data:", error);
            });*/
    }, []);

    if (!isLoaded || loadError) {
        return <p>Loading... Please wait.</p>;
    }

    const polylinePath = locations.map(location => new window.google.maps.LatLng(location.lat, location.lng));

    function groupBy(array, key) {
        return array.reduce((result, currentItem) => {
            const groupKey = currentItem[key];
            if (!result[groupKey]) {
                result[groupKey] = [];
            }
            result[groupKey].push(currentItem);
            return result;
        }, {});
    }

    return (
        <Container className="alog">
            <Row>
                <Col sm={4}>
                    {/* Details Side */}
                    <div className="p-4 h-100 bg-white shadow">
                        <h2 style={{marginBottom:'2em'}}>DETAILS</h2>
                        {Object.keys(salesData).map((date) => (
                            <div key={date}>
                                <Table>
                                    <tbody>
                                    {salesData[date].map((sale, index) => (
                                        <div className="sales-details" key={index}>
                                            <div className="sales-label">Sales Rep:</div>
                                            <div className="sales-value">{sale.repUserName}</div>

                                            <div className="sales-label">Contact:</div>
                                            <div className="sales-value">{sale.mobileNo}</div>

                                            <div className="sales-label">Customer:</div>
                                            <div className="sales-value">{sale.name}</div>

                                            <div className="sales-label">Item:</div>
                                            <div className="sales-value">{sale.itemName}</div>

                                            <div className="sales-label">Quantity:</div>
                                            <div className="sales-value">{sale.qty}</div>
                                        </div>
                                    ))}
                                    </tbody>
                                </Table>
                            </div>
                        ))}
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
                            {locations.map((location, index) => {
                                const label = {
                                    text: `${index + 1}`, // Display index number (add 1 to make it 1-based index)
                                    color: 'white', // Customize label text color
                                    fontSize: '12px', // Customize font size
                                    fontWeight: 'bold', // Customize font weight
                                    // You can customize other label properties here
                                };
                                return (
                                    <Marker
                                        key={index}
                                        position={location}
                                        label={label} // Set the label with index number
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
