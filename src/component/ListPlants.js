import React, {useContext, useEffect, useState} from "react";
import { useHistory } from 'react-router-dom';
import PlantDataService from "../service/PlantDataService";
import {StoreContext} from "../store/storeProvider";

function ListPlants(props) {
  const {user} = useContext(StoreContext);
  const [plants, setPlants] = useState([]);
  console.log(plants);
  let history = useHistory();
  useEffect(() => {
    PlantDataService.retrieveAllPlants(user.id).then((response) => {
      setPlants(response.data);
      console.log(response.data);
    });
  }, []);

  const deletePlantClicked = async (plantId) => {
    const { status } = await PlantDataService.deletePlant(user.id, plantId);
    console.log(status);
    PlantDataService.retrieveAllPlants(user.id).then((response) => {
      setPlants(response.data);
      console.log(response.data);
    });
  };

  function updatePlantClicked(id) {
    history.push(`/plants/${id}`);
  }

  function addPlantClicked() {
    history.push(`/plants/-1`);
  }

  return (
    <div className="container">
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {plants.map((plant) => (
              <tr key={plant.name}>
                <td>{plant.name}</td>
                <td>{plant.description}</td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => deletePlantClicked(plant.id)}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={() => updatePlantClicked(plant.id)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="row">
        <button className="btn btn-success" onClick={() => addPlantClicked()}>
          Add
        </button>
      </div>
    </div>
  );
}

export default ListPlants;
