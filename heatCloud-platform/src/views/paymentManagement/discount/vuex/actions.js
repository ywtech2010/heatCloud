import { getPreferentialList,functionName1, functionName2 } from './api';

export const actions = {
  async listOfPreferentialList({ commit }, params) {
    commit('PREFERENT_LIST_START', params);
    const response = await getPreferentialList(params);
    commit('PREFERENT_LIST_COMPLETED', response);
  },
  async Create({}, data) {
    try {
      await functionName2(data);
      return true;
    } catch (err) {
      return false;
    }
  }
};
