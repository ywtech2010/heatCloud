import { functionName1, functionName2 } from './api';

export const actions = {
  async List({ commit }, params) {
    commit('LIST_START', params);
    const response = await functionName1(params);
    commit('LIST_COMPLETED', response);
  },
  async Create({}, data) {
    try {
      await functionName2(data);
      return true;
    } catch (err) {
      return false;
    }
  },
  async Update({}, data) {
    try {
      await functionName2(data);
      return true;
    } catch (err) {
      return false;
    }
  },
};
