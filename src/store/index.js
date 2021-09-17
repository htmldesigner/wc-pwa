import Vue from 'vue'
import Vuex from 'vuex'
import tasks from './tasks'
import auth from './auth'
import common from "./common";
import VueGeolocation from 'vue-browser-geolocation';

Vue.use(VueGeolocation);
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appName: "E-SEP",
    coordinates: null,
    isOnline: false
  },
  mutations: {
    addCoordinates(state, payload) {
      state.coordinates = [payload.lat, payload.lng].join(",")
    },
    ADD_IS_ONLINE(state, payload) {
      state.isOnline = payload
    }
  },

  actions: {
    detectCoordinates({state, commit, dispatch}) {
      VueGeolocation.getLocation()
        .then(coordinates => {
          commit('addCoordinates', coordinates)
        }).catch(e => {
        alert('Разрешите доступ к геоданным')
      })
    },
    setOnline({commit}, payload) {
      commit('ADD_IS_ONLINE', payload)
    }
  },

  getters: {
    appName: (state) => state.appName,
    coordinates: (state) => state.coordinates,
    isOnline: (state) => state.isOnline
  },

  modules: {
    common,
    tasks,
    auth,
  },
  // plugins: [createPersistedState()]
})
