import axios from 'axios';
const MANAGER_API_URL = "http://localhost:8080";
const USER_API_URL = `${MANAGER_API_URL}/users`;


class UserDataService {
    createUser(user){
        return axios.post(`${MANAGER_API_URL}/addUser`, user);
    }

    loginUser(values){
        return axios.create({
            validateStatus: false
        }).post(USER_API_URL, values);
    }
}

export default new UserDataService();