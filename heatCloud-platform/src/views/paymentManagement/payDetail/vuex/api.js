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
 * 获取用户缴费列表数据
 * */
export function userOrderList(params) {
  return request({
    url:'/backend/order/user/search',
    method:'post',
    data:params
  })
}

/**
 * 用户缴费订单删除
 * */
export function userOrderDelete(params) {
  return request({
    url:`/backend/order/user/${params.id}`,
    method:'delete',
  })
}

/**
 * 用户缴费订单详情
 *
 * */
export function userPayDetail(params) {
  return request({
    url:`/backend/order/user/detail?id=${params.orderId}`,
    method:'get',
  })
}

/**
 * 获取用户订单统计
 *
 * */
export function userOrderSummary(params) {
  return request({
    url:`/backend/order/user/summary`,
    method:'post',
    data:params
  })
}
