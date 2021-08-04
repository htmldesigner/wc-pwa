import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueGeolocation from 'vue-browser-geolocation';


Vue.config.productionTip = false

Vue.use(VueGeolocation);



new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
