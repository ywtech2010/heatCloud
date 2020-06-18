import {userOrderList ,functionName1, functionName2 } from './api';

export const actions = {
  async getUserOrderList({ commit }, params) {
    commit('LIST_START', params);
    const response = await userOrderList(params);
    commit('LIST_COMPLETED', response);
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
