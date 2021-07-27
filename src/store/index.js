import Vue from 'vue'
import Vuex from 'vuex'
import tasks from './tasks'
import login from './login'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appName: 'Water PWA',
    server: 'http://127:0.0.1:8080/',
    isOnline: false
  },
  mutations: {
  },
  actions: {
  },
  getters: {
    
  },
  modules: {
    tasks,
    login
  }
})
