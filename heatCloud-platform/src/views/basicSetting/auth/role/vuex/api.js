// API
import request from '@/utils/request';

/**
 * 角色列表
 * @param {*} params
 */
export function list(params) {
  return request({
    url: '/api/company-admin/auth/role/list/all',
    method: 'get',
    params,
  });
}

/**
 * 查询角色
 * @param {*} params
 */
export function query(params) {
  return request({
    url: '/api/company-admin/auth/role/query',
    method: 'get',
    params,
  });
}

/**
 * 根据角色名称查询角色列表
 * @param {*} params
 */
export function search(params) {
  return request({
    url: '/api/company-admin/auth/role/list/name',
    method: 'get',
    params,
  });
}

/**
 * 添加角色
 * @param {*} params
 */
export function add(params) {
  return request({
    url: '/api/company-admin/auth/role/add',
    method: 'post',
    data: params,
  });
}

/**
 * 编辑角色
 * @param {*} params
 */
export function edit(params) {
  return request({
    url: '/api/company-admin/auth/role/edit',
    method: 'post',
    data: params,
  });
}

/**
 * 删除角色
 * @param {*} id
 */
export function del(id) {
  return request({
    url: `/api/company-admin/auth/role/remove/${id}`,
    method: 'delete',
  });
}
