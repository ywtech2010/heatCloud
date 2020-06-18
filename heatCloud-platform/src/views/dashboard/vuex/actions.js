import { getHistogram, getHistogramByYear, getLine, getLineByYear, getOverview } from './api';

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
  async GetHistogram({ commit }, params) {
    try {
      const response = await getHistogram(params);
      commit('SET_HISTOGRAM', response);
      return response;
    } catch (err) {
      return false;
    }
  },
  async GetHistogramByYear({ commit }, params) {
    try {
      return await getHistogramByYear(params);;
    } catch (err) {
      return false;
    }
  },
  async GetLine({ commit }, params) {
    try {
      const response = await getLine(params);
      commit('SET_LINE', response);
      return response;
    } catch (err) {
      return false;
    }
  },
  async GetLineByYear({ commit }, params) {
    try {
      return await getLineByYear(params);
    } catch (err) {
      return false;
    }
  },
  async GetOverview({ commit }, params) {
    try {
      return await getOverview(params);
    } catch (err) {
      return false;
    }
  },
};
