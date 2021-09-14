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
    coordinates: null
  },
  mutations: {
    addCoordinates(state, payload) {
      state.coordinates = [payload.lat, payload.lng].join(",")
      console.log(state.coordinates)
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
    }
  },

  getters: {
    appName: (state) => state.appName,
    coordinates: (state) => state.coordinates
  },
  modules: {
    common,
    tasks,
    auth,
  },
  // plugins: [createPersistedState()]
})
