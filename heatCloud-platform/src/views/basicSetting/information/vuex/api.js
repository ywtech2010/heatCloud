// API
import request from '@/utils/request';

// 获取公司信息设置
export function getCompanyInfo(params) {
  return request({
    url: '/api/company-admin/info/getCompanyInfo',
    method: 'get',
  });
}

// 更新公司信息设置
export function updateCompanyInfo(params) {
  return request({
    url: '/api/company-admin/info/updateCompanyInfo',
    method: 'post',
    data: params,
  });
}
