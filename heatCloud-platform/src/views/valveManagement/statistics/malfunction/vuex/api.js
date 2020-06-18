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
 * 获取开关阀统计
 * */
export function getStatisticList(params) {
  return request({
    url: `/valve/statistic/list`,
    method:'get',
    params: params
  })
}
