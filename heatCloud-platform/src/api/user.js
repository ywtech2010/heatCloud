import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/company-admin/login',
    method: 'post',
    data: data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}

// 忘记密码发送验证码
export function getVerifyCode(params) {
  return request({
    url: `/api/company-admin/login/getLoginCode/${params}`,
    method: 'get',
  })
}

// 个人中心-保存修改密码
export function updateEditPwd(params) {
  return request({
    url: '/api/company-admin/login/updateEditPwd',
    method: 'post',
    data: params
  })
}

// 忘记密码设置新密码
export function updatePwd(params) {
  return request({
    url: '/api/company-admin/login/updatePwd',
    method: 'post',
    data: params
  })
}
