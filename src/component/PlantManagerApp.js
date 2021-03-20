import React from "react";
import ListPlants from "./ListPlants";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import PlantComponent from "./PlantComponent";
import PrimarySearchAppBar from "./PrimarySearchAppBar";

function PlantManagerApp() {
  return (
    <Router>
        <>
            <PrimarySearchAppBar/>
            <Switch>
                <Route path="/" exact component={ListPlants} />
                <Route path="/plants" exact component={ListPlants} />
                <Route path="/plants/:id" component={PlantComponent} />
            </Switch>
        </>
    </Router>
  );
}

export default PlantManagerApp;
