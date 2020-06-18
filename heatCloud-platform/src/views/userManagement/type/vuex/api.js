// API
import request from '@/utils/request';

/**
 *
 * @param {*} params
 * POST
 */
export function userTypeAdd(params) {
  return request({
    url: `/api/company-admin/user/type/add`,
    method: 'post',
    data: params
  })
}

export function userTypeEdit(params) {
  return request({
    url: `/api/company-admin/user/type/edit`,
    method: 'post',
    data: params
  })
}

export function userTypeDelete(params) {
  return request({
    url: `/api/company-admin/user/type/remove`,
    method: 'post',
    data: params
  })
}

export function userTypeAction(params) {
  return request({
    url: `/api/company-admin/user/type/action`,
    method: 'post',
    data: params
  })
}

/**
 * GET
 */
export function userTypeList(params) {
  return request({
    url: `/api/company-admin/user/type/list`,
    method: 'get',
    params: params
  })
}

/**
 * GET
 */
export function userTypeValueList(params) {
  return request({
    url: `/api/company-admin/user/type/list/value`,
    method: 'get',
    params: params
  })
}
