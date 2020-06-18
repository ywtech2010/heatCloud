export const mutations = {
  REQUEST_START: (state, form) => {
    state.loading = true;
  },
  REQUEST_COMPLETED: (state, data) => {
    state.loading = false;
    state.data = data;
  },
  SET_INFO: (state, data) => {
    state.data = data;
  }
};
