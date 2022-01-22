import { createStore } from 'vuex'

export default createStore({
  state: {
    user: {},
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
    }
  },
  actions: {
  },
  getters: {
    getUser: (state) => state.user
  }
})