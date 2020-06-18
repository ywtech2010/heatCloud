import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { state } from './types';

const namespaced = true;

const cardManage = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
export default cardManage;
