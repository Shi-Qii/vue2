import axios from "axios";
import authHeader from './auth-header';

const INSTRUCTOR = "in28minutes";
const COURSE_API_URL = "http://localhost:8070"; //後端的port
const INSTRUCTOR_API_URL = `${COURSE_API_URL}/instructors/${INSTRUCTOR}`; //後端URL結構
//@CrossOrigin(origins = { “http://localhost:3000”, “http://localhost:4200”, “http://localhost:8081” }) - Allow requests from specific origins
class CourseDataService {
    //搜尋方法
    retrieveAllCourses() {
        return axios.get(`${INSTRUCTOR_API_URL}/courses`, { headers: authHeader() }); //完整URL 
        // 登入後引入auth-header登入資訊 此時是admin點他 打入後端API確認admin無誤
        //登入後 透過store解析 儲存user 到localstorge再到auth header裡面 這邊在取出來打到後端驗證 正確無誤後運行方法 拿到資料
    }
    selectType(name,selectType) {
        return axios.get(`${INSTRUCTOR_API_URL}/${selectType}`, { headers: authHeader() });
    }
    
    // retrieveAllComment() {
    //     return axios.get(`${INSTRUCTOR_API_URL}/readcomment`, { headers: authHeader() }); //完整URL 
    //     // 登入後引入auth-header登入資訊 此時是admin點他 打入後端API確認admin無誤
    //     //登入後 透過store解析 儲存user 到localstorge再到auth header裡面 這邊在取出來打到後端驗證 正確無誤後運行方法 拿到資料
    // }
    retrieveAllComment(name, id) {
        return axios.get(`${INSTRUCTOR_API_URL}/readcomment/${id}`, { headers: authHeader() }); //完整URL 
        // 登入後引入auth-header登入資訊 此時是admin點他 打入後端API確認admin無誤
        //登入後 透過store解析 儲存user 到localstorge再到auth header裡面 這邊在取出來打到後端驗證 正確無誤後運行方法 拿到資料
    }
    //刪除方法
    deletemovie(name, id) {
        return axios.delete(`${INSTRUCTOR_API_URL}/movie/${id}`, { headers: authHeader() });
    }
    //指定搜尋方法
    retrieveCourse(name, id) {
        return axios.get(`${INSTRUCTOR_API_URL}/readcommenttest/${id}`, { headers: authHeader() });
    }

    // retrieveCoursetitle(name, title) {
    //     return axios.get(`${INSTRUCTOR_API_URL}/courses/${id}`);
    // }
    //  更新
    updateCourse(name, id, course) {
        //console.log('executed service')
        return axios.put(`${INSTRUCTOR_API_URL}/courses/${id}`, course, { headers: authHeader() });
    }

    //  新增方法
    createMovie(name, id, course,formData,config) {
        //console.log('executed service')
        return axios.post(`${INSTRUCTOR_API_URL}/courses/`, course,formData,config, { headers: authHeader() });
    }
    upload(name,formData){
        return axios.post(`${INSTRUCTOR_API_URL}/upload`,formData, { headers: authHeader(),  'Content-Type': 'multipart/form-data' }, );
    }
    // createCourse(name, id, course) {
    //     //console.log('executed service')
    //     return axios.put(`${INSTRUCTOR_API_URL}/courses/${id}`, course, { headers: authHeader() });
    // }
    // readcomment(name, id) {
    //     return axios.get(`${INSTRUCTOR_API_URL}/courses/${id}`);

    // }

}

export default new CourseDataService();