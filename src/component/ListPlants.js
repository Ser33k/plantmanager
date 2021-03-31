import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import PlantDataService from "../service/PlantDataService";

function ListPlants(props) {
  const [plants, setPlants] = useState([]);
  let history = useHistory();
  useEffect(() => {
    PlantDataService.retrieveAllPlants().then((response) => {
      setPlants(response.data);
    });
  }, []);

  const deletePlantClicked = async (id) => {
    const { status } = await PlantDataService.deletePlant(id);

    if (status === 204) {
      setPlants((prev) => prev.filter((plant) => plant.id !== id));
    }
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
