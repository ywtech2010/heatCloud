export const mutations = {
  BACKEND_LIST_START: (state, form) => {
    state.loading = true;
    state.form = form;
  },
  LIST_BACKEND: (state, data) => {
    state.loading = false;
    state.data = data;
  },

  // PUBLISH_START: (state) => {
  //   state.loading = true;
  // },
  // PUBLISH_BACKEND: (state, data) => {
  //   state.data = data;
  // },


  Delete_ORDER_START: (state, form) => {
    state.loading = true;
    state.form = form;
  },
  Delete_ORDER_BACKEND: (state, data) => {
    state.loading = false;
    state.data = data;
  },

  LIST_COMPLETED: (state, data) => {
    state.loading = false;
    state.data = data;
  },
  SET_ROLE_VISIBLE: (state, data) => {
    state.showRole = data;
  },




};
