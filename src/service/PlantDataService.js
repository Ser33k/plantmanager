import axios from "../axios-config";

class PlantDataService {
  retrievePlant(userId, plantId) {
    return axios.get(`/plants/${plantId}`);
  }

  retrieveAllPlants(userId) {
    return axios.get(`/users/${userId}/plants`);
  }

  deletePlant(userId, plantId) {
    return axios.delete(`/users/${userId}/plants/${plantId}`);
  }

  updatePlant(userId, plantId, plant) {
    return axios.put(`/plants/${plantId}`, plant);
  }

  createPlant(userId, plant) {
    return axios.post(`/users/${userId}/plants`, plant);
  }
}

export default new PlantDataService();
