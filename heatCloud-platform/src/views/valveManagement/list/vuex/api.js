// API
import request from '@/utils/request';

/**
 * 获取阀门管理列表
 *
 * */
export function getValveList(params) {
  return request({
    url: `/valve/manage/list`,
    method: 'get',
    params: params,
  });
}

/**
 * 阀门添加
 *
 * */
export function valveAdd(params) {
  return request({
    url: `/valve/add`,
    method: 'post',
    data: params,
  });
}

/**
 * 阀门编辑
 *
 * */
export function updateValve(params) {
  return request({
    url: `/valve/edit`,
    method: 'put',
    data: params,
  });
}

/**
 * 阀门删除
 *
 * */
export function deleteValve(params) {
  return request({
    url: `/valve/${params.id}/delete`,
    method: 'delete',
    data: params,
  });
}

/**
 * 阀门详情
 *
 * */
export function detailValve(code) {
  return request({
    url: `/valve/info/${code}/detail`,
    method: 'get',
  });
}

/**
 * 阀门编辑
 *
 * @export
 * @param {*} code
 * @returns
 */
export function valveUpdate(code) {
  return request({
    url: `/valve/${code}/edit/page`,
    method: 'get'
  })
}
