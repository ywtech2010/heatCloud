import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { state } from './types';

const namespaced = true;

const valveList = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
export default valveList;
