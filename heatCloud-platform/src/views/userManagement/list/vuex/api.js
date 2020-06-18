// API
import request from '@/utils/request';

/**
 *
 * @param {*} params
 * POST
 */
export function addUser(params) {
  return request({
    url: `/api/company-admin/user/add`,
    method: 'post',
    data: params
  })
}

export function editUser(params) {
  return request({
    url: `/api/company-admin/user/edit`,
    method: 'post',
    data: params
  })
}

export function deleteUser(params) {
  return request({
    url: `/api/company-admin/user/delete`,
    method: 'post',
    data: params
  })
}

export function initPassword(params) {
  return request({
    url: `/api/company-admin/user/init/password`,
    method: 'post',
    data: params
  })
}

/**
 * GET
 */
export function userList(params) {
  return request({
    url: `/api/company-admin/user/list`,
    method: 'get',
    params: params
  })
}

export function userDetail(params) {
  return request({
    url: `/api/company-admin/user/query`,
    method: 'get',
    params: params
  })
}
