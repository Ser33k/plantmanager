import React from "react";
import ListPlants from "./ListPlants";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import PlantComponent from "./PlantComponent";

function PlantManagerApp() {
  return (
    <Router>
        <>
            <h1>PlantManager</h1>
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
