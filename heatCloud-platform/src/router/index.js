import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

/* Layout */
import Layout from '@/views/layout/Layout.vue';

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
  },

  {
    path: '/forgetPassword',
    component: () => import('@/views/login/components/forgetPassword'),
    meta: {
      title: '忘记密码'
    },
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    meta: { title: '首页', icon: 'home' },
    children: [
      {
        path: 'dashboard',
        name: '首页看板',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '快捷看板', icon: 'home' }
      },
      {
        path: 'personalCenter',
        name: '个人中心',
        hidden: true,
        component: () => import('@/views/dashboard/components/PersonalCenter'),
        meta: { title: '个人中心', icon: 'home' }
      },
    ]
  },

  {
    path: '/user',
    component: Layout,
    redirect: '/user/list',
    name: 'user',
    meta: { title: '用户管理', icon: 'user' },
    children: [
      {
        path: 'list',
        name: 'user-list',
        component: () => import('@/views/userManagement/list/index'),
        meta: { title: '用户列表', icon: 'user' }
      },
      {
        path: 'type',
        name: 'user-type',
        component: () => import('@/views/userManagement/type/index'),
        hidden: true,
        meta: { title: '类型管理', icon: 'user' }
      }
    ]
  },

  {
    path: '/heatExchange',
    component: Layout,
    redirect: '/heatExchange/index',
    hidden: false,
    name: '换热站管理',
    meta: { title: '换热站管理', icon: 'huanrezhan' },
    children: [
      {
        path: 'index',
        name: '换热站列表',
        component: () => import('@/views/heatExchange/list/index'),
        meta: { title: '换热站列表', icon: 'huanrezhan' }
      },
      {
        path: 'statistics',
        name: '换热站统计',
        hidden: true,
        component: () => import('@/views/heatExchange/statistics/index'),
        meta: { title: '统计', icon: 'huanrezhan' }
      },
      {
        path: 'warning',
        name: '换热站报警设置',
        hidden: true,
        component: () => import('@/views/heatExchange/warningSet/index'),
        meta: { title: '报警设置', icon: 'huanrezhan' }
      },
    ]
  },

  {
    path: '/valveManagement',
    component: Layout,
    redirect: '/valveManagement/list',
    name: '阀门管理',
    meta: { title: '阀门管理', icon: 'valve' },
    children: [
      {
        path: 'list',
        name: 'list',
        component: () => import('@/views/valveManagement/list'),
        meta: { title: '阀门列表', icon: 'valve' },
      },
      {
        path: 'control',
        name: 'control',
        hidden: true,
        component: () => import('@/views/valveManagement/control'),
        meta: { title: '阀门控制', icon: 'valve' },
      },
      {
        path: 'statistics',
        name: 'statistics',
        hidden: true,
        component: () => import('@/views/valveManagement/statistics'),
        meta: { title: '阀门统计', icon: 'valve' },
      },
    ],
  },

  {
    path: '/concentrator',
    component: Layout,
    redirect: '/concentrator/index',
    hidden: false,
    name: '集中器管理',
    meta: { title: '集中器管理', icon: 'jizhongqi' },
    children: [
      {
        path: 'index',
        name: 'concentrator',
        component: () => import('@/views/concentrator/main/index'),
        meta: { title: '集中器列表', icon: 'jizhongqi' }
      },
      {
        path: 'valve',
        name: '查看阀门',
        hidden: true,
        component: () => import('@/views/concentrator/valve/index'),
        meta: { title: '查看阀门', icon: 'jizhongqi' }
      },
    ]
  },

  {
    path: '/paymentManagement',
    component: Layout,
    redirect:'/paymentManagement/payment',
    meta: { title: '缴费管理', icon: 'payment' },
    children: [
      {
        path: 'payment',
        name: '缴费管理',
        component: () => import('@/views/paymentManagement/payment/index'),
        meta: { title: '缴费列表', icon: 'payment' }
      },
      {
        path: 'discount',
        name: '优惠管理',
        component: () => import('@/views/paymentManagement/discount/index'),
        hidden: true,
        meta: { title: '优惠管理', icon: 'payment' }
      },
      {
        path: 'payDetail',
        name: '缴费详情',
        component: () => import('@/views/paymentManagement/payDetail/index'),
        hidden: true,
        meta: { title: '缴费详情', icon: 'payment' }
      }

    ]
  },

  {
    path: '/card',
    component: Layout,
    meta: { title: '卡片管理', icon: 'card' },
    children: [
      {
        path: 'index',
        name: 'Card',
        component: () => import('@/views/cardManagement/index'),
        meta: { title: '卡片列表', icon: 'card' }
      }
    ]
  },

  {
    path: '/basicSetting',
    component: Layout,
    redirect: '/basicSetting/auth/list',
    meta: { title: '基础设置', icon: 'setting' },
    children: [
      {
        path: 'auth/list',
        name: 'auth',
        hidden: false,
        component: () => import('@/views/basicSetting/auth/list'),
        meta: { title: '权限设置' },
      },
      {
        path: 'auth/role',
        name: 'role',
        hidden: false,
        component: () => import('@/views/basicSetting/auth/role'),
        meta: { title: '角色设置' },
      },
      {
        path: 'information',
        name: 'information',
        component: () => import('@/views/basicSetting/information/index'),
        meta: { title: '信息设置' },
      },
      {
        path: 'log',
        name: 'log',
        hidden: false,
        component: () => import('@/views/basicSetting/log/index'),
        meta: { title: '操作日志' },
      },
      {
        path: 'area',
        name: 'area',
        component: () => import('@/views/basicSetting/area/index'),
        meta: { title: '地区设置' },
      },
    ],
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true,
  },

  { path: '*', redirect: '/404', hidden: true }
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
