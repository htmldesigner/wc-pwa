import Vue from 'vue'
import Vuex from 'vuex'
import tasks from './tasks'
import login from './login'
import common from "./common";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appName: "E-SEP",
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
    setOnline({commit}, obj) {
      commit("SET_ONLINE", obj);
    }
  },
  getters: {
    server: (state) => state.server,
    appName: (state) => state.appName
  },
  modules: {
    common,
    tasks,
    login,
  },
  // plugins: [createPersistedState()]
})
