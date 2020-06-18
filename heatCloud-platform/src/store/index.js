import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import app from './modules/app';
import settings from './modules/settings';
// import user from './modules/user';
import storage from '@/utils/storage'

//首页
import dashboard from './modules/dashboard'
// 基础设置
import basicSetting from './modules/basicSetting';
// 阀门控制
import valveManagement from './modules/valveManagement';
// 卡片管理
import cardManagement from './modules/cardManagement';
//缴费管理
import paymentManagement from './modules/paymentManagement';
// 集中器管理
import concentrator from './modules/concentrator';
// 用户管理
import userManagement from './modules/userManagement';
// 换热站管理
import heatExchange from './modules/heatExchange';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    // user,

    ...dashboard,
    ...basicSetting,
    ...valveManagement,
    ...cardManagement,
    ...paymentManagement,
    ...concentrator,
    ...userManagement,
    ...heatExchange,
  },
  getters,
  plugins: [storage]
});

export default store;
