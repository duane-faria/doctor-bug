import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      loading: false,
    };
  },
  mutations: {
    setLoading(state, loading) {
      state.loading = loading;
    },
  },
  actions: {
    setLoading(context, loading) {
      const helper = () => context.commit("setLoading", loading);
      if (!loading) setTimeout(() => helper(), 500);
      else helper();
    },
  },
  getters: {
    isLoading(store) {
      return store.loading;
    },
  },
});

export default store;
