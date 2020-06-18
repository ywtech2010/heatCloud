// API
import request from '@/utils/request';

/**
 * 管理员列表
 * @param {*} params
 */
export function list(params) {
  return request({
    url: '/api/company-admin/auth/manager/list',
    method: 'get',
    params,
  });
}

/**
 * 查询管理员
 * @param {*} params
 */
export function query(params) {
  return request({
    url: '/api/company-admin/auth/manager/query',
    method: 'get',
    params,
  });
}

/**
 * 添加管理员
 * @param {*} params
 */
export function add(params) {
  return request({
    url: '/api/company-admin/auth/manager/add',
    method: 'post',
    data: params,
  });
}

/**
 * 编辑管理员
 * @param {*} params
 */
export function edit(params) {
  return request({
    url: '/api/company-admin/auth/manager/edit',
    method: 'post',
    data: params,
  });
}

/**
 * 删除管理员
 * @param {*} managerId
 */
export function del(managerId) {
  return request({
    url: `/api/company-admin/auth/manager/remove/${managerId}`,
    method: 'delete',
  });
}

/**
 * 初始化密码
 * @param {*} params
 */
export function pwdReset(params) {
  return request({
    url: '/api/company-admin/auth/manager/init/password',
    method: 'post',
    data: params,
  });
}

/**
 * 分配角色
 * @param {*} params
 */
export function allocation(params) {
  return request({
    url: '/api/company-admin/auth/manager/allocation',
    method: 'post',
    data: params,
  });
}
