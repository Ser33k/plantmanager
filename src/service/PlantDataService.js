import axios from "axios";

const MANAGER_API_URL = "http://localhost:8080/users";
const PLANT_API_URL = `${MANAGER_API_URL}/plants`;

class PlantDataService {
  retrievePlant(userId, plantId) {
    return axios.get(`http://localhost:8080/plants/${plantId}`);
  }

  retrieveAllPlants(userId) {
    return axios.get(`${MANAGER_API_URL}/${userId}/plants`);
  }

  deletePlant(userId, plantId) {
    return axios.delete(`${MANAGER_API_URL}/${userId}/plants/${plantId}`);
  }

  updatePlant(userId, plantId, plant) {
    return axios.put(`http://localhost:8080/plants/${plantId}`, plant);
  }

  createPlant(userId, plant) {
    return axios.create({
      validateStatus: false
    }).post(`${MANAGER_API_URL}/${userId}/plants`, plant);
  }
}

export default new PlantDataService();
