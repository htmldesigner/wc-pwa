import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueGeolocation from 'vue-browser-geolocation';
import axios from "axios";
import moment from 'moment'
import 'moment/locale/ru'

Vue.prototype.$http = axios
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['token'] = `${token}`
}


Vue.prototype.moment = moment

Vue.config.productionTip = false
Vue.use(VueGeolocation);
new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
