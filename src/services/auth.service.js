import axios from 'axios';

const API_URL = 'http://localhost:8070/api/auth/';

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'signin', {
        username: user.username,
        password: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          //更新 Storage localStorage.setItem();
          localStorage.setItem('user', JSON.stringify(response.data));
      //1.vuex儲存在記憶體，localstorage則以檔案的方式儲存在本地
      // localStorage儲存到本地
      //2.vuex用於元件之間的傳值，localstorage則主要用於不同頁面之間的傳值。
      //3.永久性：當重新整理頁面時vuex儲存的值會丟失，localstorage不會。  
      //瀏覽器想要數據持久化必須使用localStorage或者sessionStorage
    }

        return response.data;
      });
  }

  logout() {
    //刪除 Storage將整個暫存刪掉。 localStorage.removeItem();
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_URL + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password
    });
  }
}
//輸出
export default new AuthService();