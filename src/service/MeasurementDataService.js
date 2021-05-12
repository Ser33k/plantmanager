import axios from "../axios-config";

class MeasurementDataService {
    retrieveAllMeasurementByPlantId(plantId){
        return axios.get(`/plant/${plantId}/measure`);
    }
}

export default new MeasurementDataService();