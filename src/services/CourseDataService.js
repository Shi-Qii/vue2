import axios from "axios";
import authHeader from './auth-header';

const INSTRUCTOR = "in28minutes";
const COURSE_API_URL = "http://localhost:8070"; //後端的port
const INSTRUCTOR_API_URL = `${COURSE_API_URL}/instructors/${INSTRUCTOR}`; //後端URL結構
//@CrossOrigin(origins = { “http://localhost:3000”, “http://localhost:4200”, “http://localhost:8081” }) - Allow requests from specific origins
class CourseDataService {
    //搜尋方法
    retrieveAllCourses() {
        return axios.get(`${INSTRUCTOR_API_URL}/courses`, { headers: authHeader()}); //完整URL 
// 登入後引入auth-header登入資訊 此時是admin點他 打入後端API確認admin無誤
//登入後 透過store解析 儲存user 到localstorge再到auth header裡面 這邊在取出來打到後端驗證 正確無誤後運行方法 拿到資料
    }

    //刪除方法
    deleteCourse(name, id) {
        return axios.delete(`${INSTRUCTOR_API_URL}/courses/${id}`, { headers: authHeader()});
    }
    //指定搜尋方法
    retrieveCourse(name, id) {
        return axios.get(`${INSTRUCTOR_API_URL}/courses/${id}`);
    }
    //  更新
    updateCourse(name, id, course) {
        //console.log('executed service')
        return axios.put(`${INSTRUCTOR_API_URL}/courses/${id}`, course, { headers: authHeader()});
    }

    //  新增方法
    createCourse(name, course) {
        //console.log('executed service')
        return axios.post(`${INSTRUCTOR_API_URL}/courses/`, course);
    }
}

export default new CourseDataService();