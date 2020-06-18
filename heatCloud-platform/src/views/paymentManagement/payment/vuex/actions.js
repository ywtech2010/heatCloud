import { getBackEndList,publishOrder,deleteUserOrder,functionName1, functionName2 } from './api';

export const actions = {
  async backendList({ commit }, params) {
    commit('BACKEND_LIST_START', params);
    const response = await getBackEndList(params);
    commit('LIST_BACKEND', response);
  },


  // async orderPublish({commit},params){
  //   try {
  //     commit('PUBLISH_START', params);
  //     const response=await publishOrder(params);
  //     commit('PUBLISH_BACKEND', response);
  //   } catch (err) {
  //     return false;
  //   }
  // },

  async Create({}, data) {
    try {
      await functionName2(data);
      return true;
    } catch (err) {
      return false;
    }
  }
};
