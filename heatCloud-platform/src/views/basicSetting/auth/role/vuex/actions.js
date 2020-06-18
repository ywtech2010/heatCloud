import { list, del } from './api';

export const actions = {
  async List({ commit }, params) {
    commit('LIST_START', params);
    const response = await list(params);
    commit('LIST_COMPLETED', response);
  },
  async Del({}, data) {
    try {
      await del(data);
      return true;
    } catch (err) {
      return false;
    }
  },
};
