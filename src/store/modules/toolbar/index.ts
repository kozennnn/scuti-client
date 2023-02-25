export interface LoadingState {
  leftToggled: boolean;
}

export default {
  namespaced: true,
  state: {
    leftToggled: false,
  },
  getters: {
    getLeftToggleState: (state: LoadingState): boolean => {
      return state.leftToggled;
    },
  },
  mutations: {
    toggleLeft: (state: LoadingState): void => {
      state.leftToggled = !state.leftToggled;
    },
  },
  actions: {},
  modules: {},
};
