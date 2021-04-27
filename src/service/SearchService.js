import axios from "../axios-config";

const SEARCH_API_URL = "/plants";

class SearchService {
    searchPlant(name) {
        return axios.get(`${SEARCH_API_URL}/?name=${name}`);
    }
}

export default new SearchService()
