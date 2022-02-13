import axios from 'axios';
import authHeader from './auth-header';

//純粹連接後端取的資料
//新增一個 add a HTTP header with the help of authHeader() function when requesting authorized resource.
const API_URL_init = 'http://localhost:8070/api/getAppVueInitData';


class DataService {

    getInitData() {

        return axios.get(API_URL_init, {headers: authHeader()});
    }
}

export default new DataService();