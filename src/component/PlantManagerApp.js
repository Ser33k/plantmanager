import React, {useContext} from "react";
import ListPlants from "./ListPlants";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import PlantComponent from "./PlantComponent";
import LoginComponent from "./LoginComponent";
import PrimarySearchAppBar from "./PrimarySearchAppBar";
import SignUpComponent from "./SignUpComponent";
import {StoreContext} from "../store/storeProvider";

function PlantManagerApp() {
    const { user } = useContext(StoreContext);
    console.log(user);
  return (
    <Router>
            <Switch>
                <Route path="/"  exact render={()=> user ? (<><PrimarySearchAppBar /> <ListPlants /></>) : <>
                < PrimarySearchAppBar />
                < SignUpComponent />
                </>} />
                <Route path="/plants/:id" exact component={PlantComponent} />
            </Switch>
    </Router>
  );
}

export default PlantManagerApp;
