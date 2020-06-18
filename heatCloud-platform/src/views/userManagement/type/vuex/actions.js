import { userTypeList, userTypeAdd, userTypeEdit, userTypeDelete, userTypeAction} from './api';

export const actions = {
  async UserTypeList({ commit }, params) {
    commit('TYPE_LIST_START', params);
    const response = await userTypeList(params);
    commit('TYPE_LIST_COMPLETED', response);
  },
  async Create({}, data) {
    try {
      await userTypeAdd(data);
      return true;
    } catch (err) {
      return false;
    }
  },
  async Update({}, data) {
    try {
      await userTypeEdit(data);
      return true;
    } catch (err) {
      return false;
    }
  },
  async Delete({}, data) {
    try {
      await userTypeDelete(data);
      return true;
    } catch (err) {
      return false;
    }
  },
  async Action({}, data) {
    try {
      await userTypeAction(data);
      return true;
    } catch (err) {
      return false;
    }
  }
};
