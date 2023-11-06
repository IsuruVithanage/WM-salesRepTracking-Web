import React from 'react';
import '../App.css';
import {Link, useNavigate} from 'react-router-dom';
import NavBar from "./NavBar";


const Home = () => {
    const navigate = useNavigate();
    const navigateToAdmin = () => {
        navigate('/adminLogin'); // Navigate to the /patient route
    };

    const navigateToSalesLeader = () => {
        navigate('/salesLeaderLogin'); // Navigate to the /patient route
    };


    return (
        <div className="container mx-auto" style={{marginTop: "10%"}}>
            <div className="row justify-content-center align-items-center">
                <div className="col-md-4 border rounded p-5 shadow">
                    <h2 className="text-center m-4" style={{fontWeight: "bold"}}>WELCOME</h2>
                    <div className="welcome-container">
                        <div className="button-container">
                            <button className="welcome-button obtn" onClick={navigateToAdmin}>
                                Admin Account
                            </button>
                            <button className="welcome-button obtn" onClick={navigateToSalesLeader}>
                                Sales Leader Account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Home;
