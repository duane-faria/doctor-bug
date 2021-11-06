import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

const store = createStore({
  state() {
    return {
      loading: false,
      user: null
    };
  },
  mutations: {
    setLoading(state, loading) {
      state.loading = loading;
    },
    SET_USER(state, user) {
      state.user = user;
    }
  },
  actions: {
    setLoading(context, loading) {
      const helper = () => context.commit("setLoading", loading);
      if (!loading) setTimeout(() => helper(), 100);
      else helper();
    },
    setUser(context, user) {
      context.commit('SET_USER', user)
    }
  },
  getters: {
    isLoading(store) {
      return store.loading;
    },
    getUser(store) {
      return store.user;
    }
  },
  plugins: [createPersistedState()],
});

export default store;
