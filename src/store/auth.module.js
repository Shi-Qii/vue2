import AuthService from '../services/auth.service';
//設置vuex module 以使用認證 做為網站的全域狀態管理，
// 可以將全域狀態集中管理,整個 Vuex 的方法也稱為 store
//  Vuex 裡面，儲存狀態的為 State
//當我們開始定義Vuex 認證authentication requests 模組時就包含以下資訊
// state: { status, user }
// actions: { login, logout, register }
// mutations: { loginSuccess, loginFailure, logout, registerSuccess, registerFailure }

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

export const auth = {
  namespaced: true,
  state: initialState,
  //state等於初始狀態 看是否登入的狀態
  actions: {
    login({ commit }, user) {
      return AuthService.login(user).then(
        user => {
          commit('loginSuccess', user);
          return Promise.resolve(user);
        },
        error => {
          commit('loginFailure');
          return Promise.reject(error);
        }
      );
    },
    logout({ commit }) {
      AuthService.logout();
      commit('logout');
    },
    register({ commit }, user) {
      return AuthService.register(user).then(
        response => {
          commit('registerSuccess');
          return Promise.resolve(response.data);
        },
        error => {
          commit('registerFailure');
          return Promise.reject(error);
        }
      );
    }
  },
  //mutations裡面儲存localstorage的資訊
  // Mutations可以更改狀態，本質就是用來處理資料的函式，
  // 其接收唯一引數值state。定義的mutation必須是同步函式。
  // this.$store.commit(mutationName)是用來觸發一個mutation的方法，或者使用輔助函式mapMutations直接將觸發函式對映到methods上，這樣就能在元素事件繫結上直接使用了。
  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    registerSuccess(state) {
      state.status.loggedIn = false;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    }
  }
};