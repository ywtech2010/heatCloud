// API
import request from '@/utils/request';

/**
 *
 * @param {*} params
 * POST
 */

/**
 * GET
 */
export function cardList(params) {
  return request({
    url: `/backend/card/list/search`,
    method: 'get',
    params: params
  })
}

/**
 * DELETE
 */
export function deleteCard(id) {
  return request({
    url: `/backend/card/${id}`,
    method: 'delete'
  })
}

export function batchDeleteCard(ids) {
  return request({
    url: `/backend/card/batch/${ids}`,
    method: 'delete'
  })
}
export function forbiddenCard(id) {
  return request({
    url: `/backend/card/forbidden`,
    method: 'put',
    data: {id: id}
  })
}

