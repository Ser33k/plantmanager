import ListPlants from "./ListPlants";
import Button from "@material-ui/core/Button";
import React, {useContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import PlantDataService from "../service/PlantDataService";
import {StoreContext} from "../store/storeProvider";

export default function UserDashboard() {
    const {user} = useContext(StoreContext);
    const [plants, setPlants] = useState([]);
    let history = useHistory();

    useEffect(() => {
        PlantDataService.retrieveAllPlants(user.id).then((response) => {
            setPlants(response.data);
            console.log(response.data);
        });
    }, []);

    function addPlantClicked() {
        history.push(`/plants/-1`)
    }

    const deletePlantClicked = async (plant) => {
        // const index = plants.indexOf(plant);
        // const filtered = plants.filter(function(plant) { return plant.id !== index })
        // setPlants(filtered)
        const { status } = await PlantDataService.deletePlant(user.id, plant.id)
        PlantDataService.retrieveAllPlants(user.id).then((response) => {
            setPlants(response.data)
            console.log(response.data)
        });
        console.log(status)
    };

    return (
        <div>
            <ListPlants plants={plants} delete={deletePlantClicked}/>
            <Button
                variant="outlined"
                color="primary"
                onClick={() => addPlantClicked()}>
                Add plant
            </Button>
        </div>
    )
}