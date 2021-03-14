import {useEffect, useState} from "react";
import PlantDataService from "../service/PlantDataService";

function ListPlants() {
    const [plants, setPlants] = useState([])

    useEffect(() => {
        PlantDataService.retrieveAllPlants()
            .then(response => {
                console.log(response)
                setPlants(response.data)
                }
            )
    }, [])

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
                        {
                            plants.map(
                                plant =>
                                    <tr key={plant.name}>
                                        <td>{plant.name}</td>
                                        <td>{plant.description}</td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ListPlants
