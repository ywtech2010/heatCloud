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
 * 获取阀门控制列表
 *
 * */
export function getValveControlList(params) {
  return request({
    url: `/valve/control/list`,
    method:'get',
    params: params
  })
}

/**
 * 阀门控制设置
 *
 * */
export function valveControlSet(params) {
  return request({
    url: `/valve/control`,
    method:'post',
    data: params
  })
}
