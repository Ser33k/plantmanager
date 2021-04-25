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

function PlantManagerApp() {
    const { user } = useContext(StoreContext);
    console.log(user);
  return (
    <Router>
            <Switch>
                <Route path="/"  exact render={()=> user ? (<><PrimarySearchAppBar /> <UserDashboard /></>) : <>
                < PrimarySearchAppBar />
                < SignUpComponent />
                </>} />
                <Route path="/plants/:id" exact component={PlantComponent} />
                <Route path="/profile" exact render={()=> user ? (<ProfileComponent />) : <>
                < PrimarySearchAppBar />
                < SignUpComponent />
                </>
                } />
            </Switch>
    </Router>
  );
}

export default PlantManagerApp;
