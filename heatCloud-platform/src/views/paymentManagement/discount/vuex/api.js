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
 * 获取优惠活动列表
 *
 * */
export function getPreferentialList(params) {
  return request({
    url:'/backend/preferential/search',
    method:'post',
    data:params,
  })
}

/**
 * 优惠活动删除
 * */

export function deletePreferential(params) {
  return request({
    url:`/backend/preferential/${params.id}`,
    method:'delete',
  })
}

/**
 * 优惠活动删除
 * */

export function preferentialAdd(params) {
  return request({
    url:'/backend/preferential/add',
    method:'post',
    data:params,
  })
}

/**
 * 优惠活动修改
 * */
export function updatePreferential(params) {
  return request({
    url:`/backend/preferential/update`,
    method:'put',
    data:params
  })
}
