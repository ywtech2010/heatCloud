import { getValveControlList, functionName2 } from './api';

export const actions = {
  async getControlList({ commit }, params) {
    commit('LIST_START', params);
    const response = await getValveControlList(params);
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
