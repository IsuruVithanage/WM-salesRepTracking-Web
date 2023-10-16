import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import AdminLogin from "./Admin/AdminLogin";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import NavBar from "./Layout/NavBar";
import ViewSalesData from "./Admin/ViewSalesData";
import ViewLocationSalesRef from "./Admin/ViewLocationSalesRef";
import MapComponent from "./Layout/MapComponent";
import AddSalesRef from "./Admin/AddSalesRef";
import SalesRefDetails from "./Admin/SalesRefDetails";
import AddSalesLeader from "./Admin/AddSalesLeader";
import SalesLeaderDetails from "./Admin/SalesLeaderDetails";
import Home from "./Layout/Home";
import MapCustomer from "./Admin/MapCustomer";

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={
                        <div className="row">
                            <NavBar isAuthenticated={true} userRole={"home"}/>
                            <Home/>
                        </div>
                    }/>
                    <Route path="/adminLogin" element={
                        <div className="row">
                            <NavBar isAuthenticated={true} userRole={"home"}/>
                            <AdminLogin/>
                        </div>
                    }/>
                    <Route path={`/salesdata`} element={
                        <div className={"row"}>
                            <NavBar isAuthenticated={true} userRole={"home"}/>
                            <ViewSalesData/>
                        </div>
                    }/>
                    <Route path={`/refLocation`} element={
                        <div className={"row"}>
                            <NavBar isAuthenticated={true} userRole={"home"}/>
                            <ViewLocationSalesRef/>
                        </div>
                    }/>
                    <Route path={`/mapLocation`} element={
                        <div className={"row"}>
                            <NavBar isAuthenticated={true} userRole={"home"}/>
                            <MapComponent/>
                        </div>
                    }/>
                    <Route path={`/addSalesRef`} element={
                        <div className={"row"}>
                            <NavBar isAuthenticated={true} userRole={"home"}/>
                            <AddSalesRef/>
                        </div>
                    }/>
                    <Route path={`/salesRef`} element={
                        <div className={"row"}>
                            <NavBar isAuthenticated={true} userRole={"home"}/>
                            <SalesRefDetails/>
                        </div>
                    }/>
                    <Route path={`/addSalesLeader`} element={
                        <div className={"row"}>
                            <NavBar isAuthenticated={true} userRole={"home"}/>
                            <AddSalesLeader/>
                        </div>
                    }/>
                    <Route path={`/salesLeader`} element={
                        <div className={"row"}>
                            <NavBar isAuthenticated={true} userRole={"home"}/>
                            <SalesLeaderDetails/>
                        </div>
                    }/>
                    <Route path={`/mapCustomer`} element={
                        <div className={"row"}>
                            <NavBar isAuthenticated={true} userRole={"home"}/>
                            <MapCustomer/>
                        </div>
                    }/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
