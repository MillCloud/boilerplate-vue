import { createStore } from 'vuex';

export default createStore({
  strict: process.env.NODE_ENV === 'development',
  state: {
    isElectron: process.env.IS_ELECTRON,
  },
  mutations: {},
  actions: {},
  modules: {},
});
