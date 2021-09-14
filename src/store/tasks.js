import axios from "axios";

export default {
  state: {
    tasks: [],
  },

  mutations: {
    ADD_TASK(state, payload) {
      state.tasks = payload
    }
  },

  actions: {
    async getTaskList({commit}) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const {data} = await axios.get("/api/consumers", {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        commit('ADD_TASK', data)
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    },

    async sendTask({commit}, payload) {
      commit('clearError')
      commit('setLoading', true)
      try {
        let formElem = new FormData()
        formElem.append('device', payload.device)
        formElem.append('value', payload.value)
        const response = await axios({
          method: 'post',
          url: "/api/indications",
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          data: formElem
        })
        commit('setLoading', false)
        if (response.data.error) {
          return response.data
        } else {
          return 'success'
        }
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    },

    sendVerifications({commit}, payload) {
    }


  },

  getters: {
    tasks: (state) => state.tasks
  }

}