import axios from 'axios'
import { Message } from 'element-ui' // element-ui message组件

// request 拦截器
axios.interceptors.request.use(config => {
  // 经常搭配token使用，将token放在请求头中，一般可用来处理1、用户是否登录2、响应header是否携带Authorization，刷新token；3、用户授权失败，跳转登录页
  let token = localStorage.getItem('token')
  config.headers['Authorization'] = `Bearer ${token}`
  return config
}, error => {
  return Promise.reject(error)
})

// response 拦截器
axios.interceptors.response.use(response => {
  return response;
}, error => {
  // 在这里你可以判断后台返回数据携带的请求码
  switch (error.response.status) {
    case 401:
      Message({
        message: '重新登录',
        type: 'error'
      })
      break
    case 403:
      Message({
        message: '没有权限',
        type: 'error'
      })
      break
    case 421:
      Message({
        message: '操作频繁',
        type: 'error'
      })
      break
    default:
      Message({
        message: '请求失败！',
        type: 'error'
      })
  }
  return Promise.resolve(error)
})

const apiRequest = {
  // 封装get请求
  getRequest(url,params){
    return new Promise((resolve, reject) => {
      axios.get(url, {params: params}).then(response => {
        resolve(response.data)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 封装post请求
  postRequest (url, data = {}) {
    return new Promise((resolve, reject) => {
      axios.post(url, data).then(response => {
        resolve(response.data)
      }).catch(err => {
        reject(err)
      })
    })
  }
}

export default apiRequest
