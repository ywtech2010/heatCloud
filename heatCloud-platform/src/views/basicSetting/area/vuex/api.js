// API
import request from '@/utils/request';

/**
 * 获取地区列表
 * @param params
 */
export function getVillageList(params) {
  return request({
    url: '/backend/village/list/search',
    method: 'get',
    params: params
  });
}
// /backend/village
/**
 * 根据id删除village
 * @param id
 */
export function deleteVillageById(id) {
  return request({
    url: `/backend/village/${id}`,
    method: 'delete',
  });
}

/**
 * 更新地区信息
 * @param params
 */
export function updateVillage(params) {
  return request({
    url: `/backend/village/edit`,
    method: 'post',
    data: params
  });
}

/**
 * 新增地区信息
 * @param params
 */
export function addVillage(params) {
  return request({
    url: `/backend/village`,
    method: 'post',
    data: params
  });
}

/**
 * 获取所有县级及以上地区列表
 * @param params
 */
export function getAreaForCountry(params) {
  return request({
    url: `/api/company-admin/user/address/list`,
    method: 'get',
    params: params
  });
}

/**
 * 获取所有街道及小区地区列表
 * @param params
 */
export function getAreaForVillage(params) {
  console.log('params', params);
  return request({
    url: `/api/company-admin/user/address/street/list`,
    method: 'get',
    params: params
  });
}

/**
 * 地区下拉列表
 * 逐级获取全国各级别数据
 * @param params
 */
export function getAreaAll(params) {
  return request({
    url: `/backend/region/list`,
    method: 'get',
    params: params
  });
}
