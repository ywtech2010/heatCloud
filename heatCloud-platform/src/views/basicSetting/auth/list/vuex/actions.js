import { list, query, add, del, edit, pwdReset, allocation } from './api';

export const actions = {
  async List({ commit }, params) {
    try {
      commit('LIST_START', params);
      const response = await list(params);
      commit('LIST_COMPLETED', response);
    } catch (err) {
      return false;
    }
  },
  async PwdReset({}, data) {
    try {
      await pwdReset(data);
      return true;
    } catch (err) {
      return false;
    }
  },
  async Del({}, data) {
    try {
      await del(data);
      return true;
    } catch (err) {
      return false;
    }
  },
  // async Update({}, data) {
  //   try {
  //     await functionName2(data);
  //     return true;
  //   } catch (err) {
  //     return false;
  //   }
  // },
};
