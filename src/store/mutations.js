export default {
  toggleLoader(state, loaderState) {
    const { loader } = state;
    const newLoaderState =
      loaderState !== undefined ? !!loaderState : !loader;
    state.loader = newLoaderState;
  }
};
