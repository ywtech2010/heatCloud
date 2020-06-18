import {
  getVillageList,
  deleteVillageById,
  addVillage,
  updateVillage,
  getAreaForCountry,
  getAreaForVillage,
  getAreaAll
} from './api';

export const actions = {
  async Create({}, data) {
    try {
      await addVillage(data);
      return true;
    } catch (err) {
      return false;
    }
  },
  async Update({}, data) {
    try {
      await updateVillage(data);
      return true;
    } catch (err) {
      return false;
    }
  },
  async Delete({}, data) {
    try {
      await deleteVillageById(data);
      return true;
    } catch (err) {
      return false;
    }
  },
  async Search({commit}, params) {
    try {
      const response = await getVillageList(params);
      commit('SET_LIST', response);
      return response
    } catch (err) {
      return false;
    }
  },
  async GetAreaForCountry({commit}, params) {
    try {
      const response = await getAreaForCountry(params);
      commit('SET_AREA_PART_ONE', response)
      return response
    } catch (err) {
      return false;
    }
  },
  async GetAreaForVillage({commit}, params) {
    try {
      const response = await getAreaForVillage(params);
      commit('SET_AREA_PART_TWO', response)
      return response
    } catch (err) {
      return false;
    }
  },
  async GetAreaAll({commit}, params) {
    try {
      return await getAreaAll(params)
    } catch (err) {
      return false;
    }
  },
  SetProvinces({commit}, data) {
    commit('SET_PROVINCES', data)
  },
  SetCities({commit}, data) {
    commit('SET_CITIES', data)
  },
  SetCounties({commit}, data) {
    commit('SET_COUNTIES', data)
  },
  SetStreets({commit}, data) {
    commit('SET_STREETS', data)
  },
  SetVillages({commit}, data) {
    commit('SET_VILLAGES', data)
  },
};
