import Vue from 'vue';
import App from './App.vue';
import { router } from './router';
import store from './store';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import VeeValidate from 'vee-validate';
import Vuex from 'vuex';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import ScrollView from 'vue-scrollview'
import BootstrapVue from 'bootstrap-vue'
import { BPaginationNav, BPagination, BCard, BCarousel, CarouselPlugin, BCarouselSlide, BFormFile } from 'bootstrap-vue'
import {
  faHome,
  faUser,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import highcharts from 'highcharts'
library.add(faHome, faUser, faUserPlus, faSignInAlt, faSignOutAlt);

Vue.config.productionTip = false;
Vue.use(CarouselPlugin)
Vue.component('highcgart',highcharts)
Vue.component('b-form-file', BFormFile)
Vue.component('b-carousel-slide', BCarouselSlide)
Vue.component('b-carousel', BCarousel)
Vue.component('b-card', BCard)
Vue.component('b-pagination', BPagination)
Vue.component('b-pagination-nav', BPaginationNav)
Vue.use(VeeValidate);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.use(ScrollView)
Vue.use(Vuex);
Vue.use(BootstrapVue)
Vue.use(Element, { size: 'small' })
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');