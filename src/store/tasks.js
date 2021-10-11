import axios from "axios";
import idb from "@/api/idb"
import service from "../services/serviсe";

export default {
  state: {
    tasks: [],
  },

  mutations: {
    ADD_TASK(state, payload) {
      state.tasks = payload
    },
    CLAER_TASK(state, payload) {
      state.tasks = payload
    }
  },

  actions: {
    async clearTask({commit}) {
      await commit('CLAER_TASK', [])
      return idb.closeAndRemove()
    },

    async getTaskList({commit, getters}) {
      commit('CLAER_TASK', [])
      commit('clearError')
      commit('setLoading', true)
      try {
        if (getters.isOnline){
          const {data} = await axios.get("/system/api/consumers")
          await idb.clear()
          // await idb.clearTable("consumers")
          await idb.getDb()
          await idb.saveConsumer(data.items, "consumers")
          const result = await idb.getTable("consumers")
          await commit('ADD_TASK', {items: result?.flat(1)})
          await commit('ADD_TASK', data)
          commit('setLoading', false)
        }else {
          await idb.getDb()
          const result = await idb.getTable("consumers")
          await commit('ADD_TASK', {items: result?.flat(1)})
          await commit('ADD_TASK', data)
          commit('setLoading', false)
        }
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    },

    async sendTask({commit, getters}, payload) {
      if (getters.isOnline) {
        commit('clearError')
        commit('setLoading', true)
        try {
          let formElem = new FormData()
          formElem.append('device', payload.device)
          formElem.append('value', payload.value)
          const response = await axios({
            method: 'post',
            url: "/system/api/indications",
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
      } else {
        // Если нет сети сохраняем в indexedDB
        let result = await idb.getTable("temporal")

        if (result) {
          const candidate = await service.arrayTemporalFilter(result, payload)
          await idb.clearTable("temporal")
          await idb.saveConsumer(candidate, "temporal")

          // Добавляет значек ожидания отправки
          const consumers = await idb.getTable("consumers")
          if (consumers) {
            const consumersResult = await service.compareDeviceId(consumers, payload)  // Сервис сравнения id устрайств
            await idb.clearTable("consumers")
            await idb.saveConsumer(consumersResult?.flat(), "consumers")
            await commit('ADD_TASK', {items: consumersResult?.flat(1)})
          }
          return 'pending'
        }
      }
    },

    async sendVerifications({commit, getters}, payload) {
      if (getters.isOnline) {
        commit('clearError')
        commit('setLoading', true)
        try {
          let formElem = new FormData()
          formElem.append('device', payload.device)
          formElem.append('value', payload.value)
          formElem.append('coordinates', payload.coordinates)
          formElem.append('photo', payload.photo)
          const response = await axios({
            method: 'post',
            url: "/system/api/verifications",
            headers: {'Content-Type': 'multipart/form-data'},
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
      } else {
        let result = await idb.getTable("temporal")
        if (result) {
          let candidate = await service.arrayTemporalFilter(result, payload)
          await idb.clearTable("temporal")
          await idb.saveConsumer(candidate, "temporal")
          return 'pending'
        }
      }
    },

    async sendTemporalData({commit, dispatch}) {
      let result = await idb.getTable("temporal")
      if (result?.flat().length) {
        result?.flat().forEach(element => {
          if (element.photo) {
            dispatch('sendVerifications', element)
          } else {
            dispatch('sendTask', element)
          }
        })
      } else {
        return false
      }
      await idb.clearTable("temporal")
      await idb.clearTable("consumers")
      await dispatch('getTaskList')
    }

  },

  getters: {
    tasks: (state) => state.tasks
  }

}