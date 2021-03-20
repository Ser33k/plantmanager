import { useEffect, useState } from "react";
import PlantDataService from "../service/PlantDataService";

function ListPlants(props) {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    PlantDataService.retrieveAllPlants().then((response) => {
      console.log(response);
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
    props.history.push(`/plants/${id}`);
  }

  function addPlantClicked() {
    props.history.push(`/plants/-1`);
  }

  return (
    <div className="container">
      <h3>All Plants</h3>
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
