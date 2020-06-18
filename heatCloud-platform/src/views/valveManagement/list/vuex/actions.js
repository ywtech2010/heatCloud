import { getValveList } from './api';

export const actions = {
  async valveGetList({ commit }, params) {
    commit('LIST_START', params);
    const response = await getValveList(params);
    commit('LIST_COMPLETED', response);
  },
};
