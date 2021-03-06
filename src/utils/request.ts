import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_HOST ?? '/',
  timeout: 60_000,
})

instance.interceptors.request.use(config => {
  return config
}, err => {
  return Promise.reject(err)
})

instance.interceptors.response.use(res => {
  return res.data
}, err => {
  return Promise.reject(err)
})

export default function (url: string, {
  method = 'GET',
  params = {},
  options = {},
} = {}) {
  method = method.toUpperCase()

  switch (method) {
    case 'GET':
      return instance.get(url, { params })

    case 'POST':
      return instance.post(url, params, options)

    case 'DELETE':
      return instance.delete(url, { params })

    case 'PUT':
      return instance.put(url, params)

    default:
      return Promise.reject(new Error(`Unknown request method: ${method}`))
  }
}
