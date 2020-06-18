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
 * 获取缴费管理列表
 *
 * */
export function getBackEndList(params) {
  return request({
    url:'/backend/order/search',
    method:'post',
    data:params,
  })
}

/**
 * 缴费发布
 *
 * */
export function publishOrder(params) {
  return request({
    url: `/backend/order/release?orderId=${params.orderId}`,
    method:'PUT',
    data:params,
  })
}

/**
 * 用户缴费订单删除
 * */
export function deleteUserOrder(params) {
  return request({
    // url: `/api/company-admin/user/type/list?dicTypeName=${params.dicTypeName}&dicValueName=${params.dicValueName}&pageNo=${params.pageNo}&pageSize=${params.pageSize}`,
    // method: 'get'
    url:`/backend/order/${params.id}`,
    method:'delete',
  })
}

/**
 * 缴费新增
 *
 * */
export function backendAdd(params) {
  return request({
    url:'/backend/order/add',
    method:'post',
    data:params,
  })
}

/**
 * 缴费编辑
 *
 * */
export function backendUpdate(params) {
  return request({
    url:'/backend/order/edit',
    method:'post',
    data:params,
  })
}

/**
 * 缴费详情
 *
 * */
export function backendDetail(params) {
  return request({
    url:`/backend/order/detail?orderId=${params.orderId}`,
    method:'get',
  })
}

/**
 * 优惠活动列表
 *
 * */
export function preferentialList(params) {
  return request({
    url:`/backend/preferential/list`,
    method:'get',
  })
}

/**
 * 导出
 *
 * */
export function orderExport(params) {
  return request({
    url:`/backend/order/export`,
    method:'post',
    data:params,
  })
}
