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
      try {
        commit('clearError')
        commit('setLoading', true)
        const {data} = await axios.get("/api/consumers")
        console.log(data)
        commit('ADD_TASK', data)
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    },
  },

  getters: {
    tasks: (state) => state.tasks
  }

}