export const mutations = {
  USER_LIST_START: (state, form) => {
    state.loading = true;
    state.form = form;
  },
  USER_LIST_COMPLETED: (state, data) => {
    state.loading = false;
    state.data = data;
  },
  SET_ROLE_VISIBLE: (state, data) => {
    state.showRole = data;
  }
};
