import axios from "axios";

export default {
  state: {
    token: null,
    agent: null,
  },
  mutations: {
    ADD_TOKEN(state, token) {
      state.token = token
      localStorage.setItem('token', token)
      if (token) {
        axios.defaults.headers.common['token'] = `${token}`;
      } else {
        delete axios.defaults.headers.common['token'];
      }
    },
    ADD_AGENT(state, payload) {
      state.agent = payload
    },
    LOG_OUT(state) {
      state.agent = null
      localStorage.removeItem('token')
    }
  },
  actions: {
    async userAuth({state, commit, dispatch}, token) {
      try {
        let formElem = new FormData()
        formElem.append('token', token)
        const response = await axios({
          method: 'post',
          url: "/api/auth",
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          data: formElem
        })
        let {data} = response
        if (data.error) {
          return alert(data.error)
        } else {
          commit('ADD_AGENT', data)
          commit('ADD_TOKEN', token)
          dispatch('getTaskList')
        }
      } catch (e) {
        console.log(e)
      }
    },
    logOut({commit}) {
      commit('LOG_OUT')
    }
  },
  getters: {
    agent(state) {
      return state.agent || localStorage.getItem('token')
    },
    token: (state) => state.token,
    isAgentLoggedIn(state) {
      return state.agent !== null
    }
  }
}