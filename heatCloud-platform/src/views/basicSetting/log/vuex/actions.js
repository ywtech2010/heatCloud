import { list, searchByName } from './api';

export const actions = {
  async List({ commit }, params) {
    commit('LIST_START', params);
    const response = await list(params);
    commit('LIST_COMPLETED', response);
  },

  async SearchByName({ commit }, params) {
    commit('LIST_START', params);
    const response = await searchByName(params);
    commit('LIST_COMPLETED', response);
  },
};
