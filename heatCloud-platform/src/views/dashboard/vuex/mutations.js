export const mutations = {
  LIST_START: (state, form) => {
    state.loading = true;
    state.form = form;
  },
  LIST_COMPLETED: (state, data) => {
    state.loading = false;
    state.data = data;
  },
  SET_HISTOGRAM: (state, data) => {
    state.histogram = data;
  },
  SET_LINE: (state, data) => {
    state.line = data;
  },
};
