export default {
  state: {
    loading: false,
    error: null,
    message: null  //{type: 'success', message: 'Данные отправленны'}
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload
    },
    setError(state, payload) {
      state.error = payload
    },
    setAlertMessage(state, payload) {
      state.message = payload
    },
    clearError(state) {
      state.error = null
    }
  },
  actions: {
    setLoading({commit}, payload) {
      commit('setLoading', payload)
    },
    setAlertMessage({commit}, payload) {
      commit('setAlertMessage', payload)
      setTimeout(() => {
        commit('setAlertMessage', null)
      }, 4000)
    },
    setError({commit}, payload) {
      commit('setError', payload)
    },
    clearError({commit}) {
      commit('clearError')
    }
  },
  getters: {
    alertMessage(state) {
      return state.message
    },
    loading(state) {
      return state.loading
    },
    error(state) {
      return state.error
    }
  }
}