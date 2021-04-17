import axios from "axios";

const SEARCH_API_URL = "http://localhost:8080/plants";

class SearchService {
    searchPlant(name) {
        return axios.get(`${SEARCH_API_URL}/?name=${name}`);
    }
}

export default new SearchService()
