import Vue from 'vue'
import Vuex from 'vuex'
import tasks from './tasks'
import upload from './upload'
import login from './login'
import notifi from './notifi'
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appName: 'Water PWA',
    server: 'http://127:0.0.1:3000/',
    isOnline: false,
    syncInterval: 15
  },
  mutations: {
    SET_ONLINE(state, bool) {
      state.isOnline = bool
    }
  },
  actions: {
    setOnline({
      commit
  }, obj) {
      commit("SET_ONLINE", obj);
  },
  },
  getters: {
    server(state){
      return state.server
  },
  
  },
  modules: {
    tasks,
    upload,
    login,
    notifi
  },
  plugins: [createPersistedState()]
})
