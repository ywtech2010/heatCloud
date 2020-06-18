export const mutations = {
  PREFERENT_LIST_START: (state, form) => {
    state.loading = true;
    state.form = form;
  },
  PREFERENT_LIST_COMPLETED: (state, data) => {
    state.loading = false;
    state.data = data;
  },
};
