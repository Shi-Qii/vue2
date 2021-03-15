import axios from 'axios';
import authHeader from './auth-header';

//純粹連接後端取的資料
//新增一個 add a HTTP header with the help of authHeader() function when requesting authorized resource.
const API_URL = 'http://localhost:8070/api/test/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all', { headers: authHeader() });
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();