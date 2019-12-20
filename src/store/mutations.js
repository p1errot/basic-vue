export default {
  toggleLoader(state, loaderState) {
    const { loader } = state;
    const newLoaderState =
      loaderState === undefined ? !loader : !!loaderState;

    state.loader = newLoaderState;
  },
  updateTerm(state, newTerm) {
    const { term } = state;

    if (newTerm && newTerm !== term) {
      state.term = newTerm;
    }
  }
};
