import axios from "axios";

const MANAGER_API_URL = "http://localhost:8080";
const PLANT_API_URL = `${MANAGER_API_URL}/plants`;

class PlantDataService {
  retrievePlant(name) {
    return axios.get(`${PLANT_API_URL}/${name}`);
  }

  retrieveAllPlants() {
    return axios.get(PLANT_API_URL);
  }

  deletePlant(id) {
    return axios.delete(`${PLANT_API_URL}/${id}`);
  }
}

export default new PlantDataService();
