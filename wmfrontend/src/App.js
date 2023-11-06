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
import SalesLeaderLogin from "./SalesLeader/SalesLeaderLogin";
import SLSalesRef from "./SalesLeader/SLSalesRef";
import RepHistory from "./SalesLeader/RepHistory";
import UpdateSalesDetails from "./Admin/UpdateSalesDetails";
import UpdateUserDetails from "./Admin/UpdateUserDetails";
import UpdateSalesLeders from "./Admin/UpdateSalesLeders";

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
                    <Route path="/salesLeaderLogin" element={
                        <div className="row">
                            <NavBar isAuthenticated={true} userRole={"home"}/>
                            <SalesLeaderLogin/>
                        </div>
                    }/>
                    <Route path={`/salesdata`} element={
                        <div className={"row"}>
                            <NavBar isAuthenticated={true} userRole={"admin"}/>
                            <ViewSalesData/>
                        </div>
                    }/>
                    <Route path={`/refLocation`} element={
                        <div className={"row"}>
                            <NavBar isAuthenticated={true} userRole={"admin"}/>
                            <ViewLocationSalesRef/>
                        </div>
                    }/>
                    <Route path={`/mapLocation/:repId`} element={
                        <div className={"row"}>
                            <NavBar isAuthenticated={true} userRole={"leader"}/>
                            <MapComponent/>
                        </div>
                    }/>
                    <Route path={`/addSalesRef`} element={
                        <div className={"row"}>
                            <NavBar isAuthenticated={true} userRole={"admin"}/>
                            <AddSalesRef/>
                        </div>
                    }/>
                    <Route path={`/salesRef`} element={
                        <div className={"row"}>
                            <NavBar isAuthenticated={true} userRole={"admin"}/>
                            <SalesRefDetails/>
                        </div>
                    }/>
                    <Route path={`/addSalesLeader`} element={
                        <div className={"row"}>
                            <NavBar isAuthenticated={true} userRole={"admin"}/>
                            <AddSalesLeader/>
                        </div>
                    }/>
                    <Route path={`/salesLeader`} element={
                        <div className={"row"}>
                            <NavBar isAuthenticated={true} userRole={"admin"}/>
                            <SalesLeaderDetails/>
                        </div>
                    }/>
                    <Route path={`/mapCustomer`} element={
                        <div className={"row"}>
                            <NavBar isAuthenticated={true} userRole={"admin"}/>
                            <MapCustomer/>
                        </div>
                    }/>
                    <Route path={"/SLSalesRep/:managerId"} element={
                        <div className={"row"}>
                            <NavBar isAuthenticated={true} userRole={"leader"}/>
                            <SLSalesRef/>
                        </div>
                    }/>
                    <Route path={`/repHistory/:repId`} element={
                        <div className={"row"}>
                            <NavBar isAuthenticated={true} userRole={"leader"}/>
                            <RepHistory/>
                        </div>
                    }/>
                    <Route path={`/salesData/:id`} element={
                        <div className={"row"}>
                            <NavBar isAuthenticated={true} userRole={""}/>
                            <UpdateSalesDetails/>
                        </div>
                    }/>
                    <Route path={`/UserUpdate/:userId`} element={
                        <div className={"row"}>
                            <NavBar isAuthenticated={true} userRole={""}/>
                            <UpdateUserDetails/>
                        </div>
                    }/>
                    <Route path={`/leaderUpdate/:userId`} element={
                        <div className={"row"}>
                            <NavBar isAuthenticated={true} userRole={""}/>
                            <UpdateSalesLeders/>
                        </div>
                    }/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
