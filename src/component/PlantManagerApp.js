import React, {useContext} from "react";
import ListPlants from "./ListPlants";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import PlantComponent from "./PlantComponent";
import LoginComponent from "./LoginComponent";
import PrimarySearchAppBar from "./PrimarySearchAppBar";
import SignUpComponent from "./SignUpComponent";
import {StoreContext} from "../store/storeProvider";
import UserDashboard from "./UserDashboard";
import {ProfileComponent} from "./ProfileComponent";
import MeasurementComponent from "./MeasurementComponent";

function PlantManagerApp() {
    const { user } = useContext(StoreContext);
    console.log(user);
  return (
    <Router>
        < PrimarySearchAppBar />

        <Switch>
                <Route path="/"  exact render={()=> user ? (<><UserDashboard /></>) : <>
                < SignUpComponent />
                </>} />
                <Route path="/plants/:id" exact render={({location, match})=> user ? <PlantComponent match={match} location={location}/> : <SignUpComponent />} />
                <Route path="/measurement/:id" exact render={({location, match}) => (
                    <>

                    <MeasurementComponent match={match} location={location}/>
                    </>
                )} />
                <Route path="/profile" exact render={()=> user ? (<ProfileComponent />) : <>

                < SignUpComponent />
                </>
                } />
            </Switch>
    </Router>
  );
}

export default PlantManagerApp;
