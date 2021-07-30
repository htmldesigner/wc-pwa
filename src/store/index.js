import Vue from 'vue'
import Vuex from 'vuex'
import tasks from './tasks'
import login from './login'
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appName: 'Water PWA',
    server: 'http://127:0.0.1:3000/',
    isOnline: false
  },
  mutations: {
  },
  actions: {
  },
  getters: {
    server(state){
      return state.server
  },
  
  },
  modules: {
    tasks,
    login
  },
  plugins: [createPersistedState()]
})
