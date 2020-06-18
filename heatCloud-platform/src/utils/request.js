import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  withCredentials: true,
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 5000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  },
  error => {
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (response.config.url.indexOf('user/info') > 1 || response.config.url.indexOf('user/logout') > 1) {
      if (res.code !== 20000) {
        Message({
          message: res.message,
          type: 'error',
          duration: 5 * 1000
        })
        return Promise.reject('error')
      } else {
        return response.data
      }
    }
    else {
      if (!res.success) {
        const msg = res.msg || '未知错误，请联系管理员';
        Message({
          message: msg,
          type: 'error',
          duration: 5 * 1000
        });
        return Promise.reject('error')
      } else {
        return res.data
      }
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: '网络错误，清稍后重试',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
