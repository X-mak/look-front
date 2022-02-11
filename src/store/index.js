import { createStore } from 'vuex'

export default createStore({
  state: {
    user: {},
    hobbyList: ["音乐","游戏","棋类","运动","美术"],
    skillList:["管理","计算机","会计","数学","职业意见"],
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
    }
  },
  actions: {
  },
  getters: {
    getUser: (state) => state.user,
    getHobby:(state) => state.hobbyList,
    getSkill:(state) => state.skillList
  }
})