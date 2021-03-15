//we access protected resources, the HTTP request needs Authorization header.
//取得localstorge 的user資訊  如果已經登入取得token(JWT),回傳HTTP Authorization header. Otherwise, return an empty object.
export default function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));
  
    if (user && user.accessToken) {
      return { Authorization: 'Bearer ' + user.accessToken }; // for Spring Boot back-end
      // return { 'x-access-token': user.accessToken };       // for Node.js Express back-end
    } else {
      return {};
    } 
  }