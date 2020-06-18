import { userList, addUser, editUser, deleteUser, initPassword} from './api';

export const actions = {
  async List({ commit }, params) {
    commit('USER_LIST_START', params);
    const response = await userList(params);
    commit('USER_LIST_COMPLETED', response);
  },
  async Create({}, data) {
    try {
      await addUser(data);
      return true;
    } catch (err) {
      return false;
    }
  },
  async Update({}, data) {
    try {
      await editUser(data);
      return true;
    } catch (err) {
      return false;
    }
  },
  async Delete({}, data) {
    try {
      await deleteUser(data);
      return true;
    } catch (err) {
      return false;
    }
  },
  async Action({}, data) {
    try {
      await initPassword(data);
      return true;
    } catch (err) {
      return false;
    }
  }
};
