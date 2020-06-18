// API
import request from '@/utils/request';


export function commonGetRequest(data) {
  const {url, params} = data;
  return request({
    url: url,
    method: 'get',
    params: params
  })
}

export function commonPutRequest(data) {
  const {url, params} = data;
  return request({
    url: url,
    method: 'get',
    params: params
  })
}

export function commonDeleteRequest(data) {
  const {url, params} = data;
  return request({
    url: url,
    method: 'delete',
    params: params
  })
}

export function commonPostRequest(data) {
  const {url, params} = data;
  return request({
    url: url,
    method: 'post',
    data: params
  })
}

export function getHistogram(params) {
  return request({
    url: '/backend/index/list/money/histogram/year',
    method: 'get',
    params: params
  })
}
export function getHistogramByYear(params) {
  return request({
    url: '/backend/index/list/money/histogram/month',
    method: 'get',
    params: params
  })
}
export function getLine(params) {
  return request({
    url: '/backend/index/list/warning/line/year',
    method: 'get',
    params: params
  })
}
export function getLineByYear(params) {
  return request({
    url: '/backend/index/list/warning/line/month',
    method: 'get',
    params: params
  })
}
export function getOverview(params) {
  return request({
    url: '/api/company-admin/statistical/data/overview',
    method: 'get',
    params: params
  })
}
