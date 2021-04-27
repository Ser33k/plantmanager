import axios from "../axios-config";
const USER_API_URL = `/users`;


class UserDataService {
    createUser(user){
        return axios.post(`/addUser`, user);
    }

    loginUser(values){
        return axios.post(USER_API_URL, values);
    }
}

export default new UserDataService();