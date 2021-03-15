import Vue from 'vue';
import Vuex from 'vuex';
import ScrollView from 'vue-scrollview'
import { auth } from './auth.module';
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

//設置index.js 把auth.module導入此處的Vuex 倉庫
//這樣在引入store這個資料夾時 同時也引入這個倉庫的資訊
Vue.use(Vuex);
Vue.use(BootstrapVue)
Vue.use(ScrollView)

export default new Vuex.Store({
  modules: {
    auth
  }
});