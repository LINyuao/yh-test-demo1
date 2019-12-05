import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
    allUserDate: [],
    activeName: 0,
    active: 0
  },
  getters: {
    isLogin: state => state.isLogin,
    allUserDate: state => state.allUserDate,
    getactiveName: state => state.activeName,
    getactive: state => state.active
  },
  mutations: {
    userStatus(state, token) {
      state.isLogin = token;
    },
    userDate(state, token) {
      state.allUserDate = token;
    },
    activeNameStatus(state, e) {
      state.activeName = e;
    },
    activeStatus(state, e) {
      state.active = e;
    }
  },
  actions: {
    setUser({ commit }, token) {
      commit("userStatus", token);
    },
    saveUserDate({ commit }, token) {
      commit("userDate", token);
    },
    saveStatus({ commit }, token) {
      commit("activeNameStatus", token);
    },
    _saveStatus({ commit }, token) {
      commit("activeStatus", token);
    }
  },
  modules: {}
});
