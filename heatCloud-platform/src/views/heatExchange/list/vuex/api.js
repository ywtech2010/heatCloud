// API
import request from '@/utils/request';

/**
 *
 * @param {*} params
 * POST
 */
export function functionName1(params) {
  const { url, ...other } = params;
  return request({
    url,
    method: 'post',
    data: other
  });
}

/**
 * GET
 */
export function functionName2() {
  return request({ url: '/XXX', method: 'get' });
}

/**
 * 添加换热站
 * */

export function addHeatState(data) {
  return request({
    url:'/api/company-admin/station/add',
    method:'post',
    data:data
  })
}

/**
 * 获取换热站列表数据
 * */
export function getStationList(params) {
  return request({
    url: `/api/company-admin/station/list`,
    method: 'get',
    params: params
  })
}
