import { cardList, deleteCard, batchDeleteCard, forbiddenCard } from './api';

export const actions = {
  async List({ commit }, params) {
    commit('CARD_LIST_START', params);
    const response = await cardList(params);
    commit('CARD_LIST_COMPLETED', response);
  },
  async Delete({}, data) {
    try {
      await deleteCard(data);
      return true;
    } catch (err) {
      return false;
    }
  },
  async Forbidden({}, data) {
    try {
      await forbiddenCard(data);
      return true;
    } catch (err) {
      return false;
    }
  },
  async BatchDelete({}, data) {
    try {
      await batchDeleteCard(data);
      return true;
    } catch (err) {
      return false;
    }
  }
};
