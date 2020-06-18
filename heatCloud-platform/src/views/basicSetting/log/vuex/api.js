// API
import request from '@/utils/request';

/**
 * 日志列表
 *
 * @export
 * @param {*} params
 * @returns
 */
export function list(params) {
  return request({
    url: '/operation/log/search/list',
    method: 'get',
    params,
  });
}

/**
 * 根据姓名模糊查询
 *
 * @export
 * @param {*} params
 * @returns
 */
export function searchByName(params) {
  const { username } = params;
  return request({
    url: `/operation/log/search/${username}/list`,
    method: 'get',
    params,
  });
}
