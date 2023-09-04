import axios from 'axios'
import { message } from 'antd'
import { getToken } from '../utils/user-token'
// import { getToken } from '../utils/user-token'

const instance = axios.create({
  timeout: 10 * 1000,
  baseURL: 'http://120.26.89.221:4000',
  headers: {
    post: {
      'Content-Type': 'application/json'
    }
  },
})

// request 拦截：每次请求都带上 token
instance.interceptors.request.use(
  config => {
    config.headers['Authorization'] = `Bearer ${getToken()}`
    return config
  },
  error => Promise.reject(error)
)

// response 拦截：统一处理 errno 和 msg
instance.interceptors.response.use(res => {
  const resData = (res.data || {}) as ResType
  const { errno, data, msg } = resData

  if (errno !== 0) {
    // 错误提示
    if (msg) {
      message.error(msg)
    }

    throw new Error(msg)
  }

  return data as any
})

export default instance

export type ResType = {
  errno: number
  data?: ResDataType
  msg?: string
}

export type ResDataType = {
  [key: string]: any
}
