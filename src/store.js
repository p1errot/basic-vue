import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    loader: false
  },
  mutations: {
    toggleLoader(state, loaderState) {
      const { loader } = state;
      const newLoaderState =
        loaderState !== undefined ? !!loaderState : !loader;
      state.loader = newLoaderState;
    }
  }
});
