import { getCompanyInfo, updateCompanyInfo } from './api'

export const actions = {
  async GetInfo ({ commit }, params) {
    try {
      const response = await getCompanyInfo(params);
      commit('SET_INFO', response)
      return response
    } catch (err) {
      return err;
    }
  },
  async UpdateInfo ({ commit }, params) {
    try {
      commit('REQUEST_START', params);
      const response = await updateCompanyInfo(params);
      commit('REQUEST_COMPLETED', response);
      return true
    } catch (err) {
      return err;
    }
  },
};
