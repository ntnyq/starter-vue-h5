import axios from 'axios'
import Qs from 'qs'
import { Toast } from 'vant'
import { CODE_SUCCESS } from '@/constants/http-status'

const {
  VUE_APP_API_HOST,
  VUE_APP_REQUEST_TIMEOUT = 3e4,
} = process.env

const instance = axios.create({
  baseURL: VUE_APP_API_HOST,
  timeout: VUE_APP_REQUEST_TIMEOUT,
})

instance.interceptors.request.use(config => {
  if (config.method === 'post') {
    config.data = Qs.stringify(config.data)
  }

  return config
}, err => {
  return Promise.reject(err)
})

instance.interceptors.response.use(res => {
  const { status, data } = res

  switch (status) {
    case CODE_SUCCESS:
      return data

    default:
      break
  }
}, err => {
  const isRequestTimeout = err.code === 'ECONNABORTED' && err.message.includes('timeout')

  if (isRequestTimeout) {
    Toast.fail('Response timeout!')
  } else {
    Toast.fail(err.message || 'Response failed unexpectly!')
  }

  return Promise.reject(err)
})

export default function (path, {
  method = 'GET',
  params = {},
  options = {},
} = {}) {
  method = method.toUpperCase()

  switch (method) {
    case 'GET':
      return instance.get(path, { params })

    case 'POST':
      return instance.post(path, params, options)

    case 'DELETE':
      return instance.delete(path, { params })

    case 'PUT':
      return instance.put(path, params)

    default:
      return Promise.reject(new Error(`Unknown request method: ${method}`))
  }
}
