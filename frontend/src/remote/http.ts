import axios, { AxiosInstance } from 'axios'
import { UnAuthorizationError, ClientError, ServerError } from './errors'
import { getAccessToken, removeAccessToken } from '../components/auth/token'

const auth = (request: AxiosInstance) => {
  request.interceptors.request.use((config) => {
    const token = getAccessToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })
  return request
}

export const request = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: false,
})

export const authRequest = auth(request)

// 400번대, 500번대 에러 처리
request.interceptors.response.use(
  function (response) {
    return response.data // 백엔드에서 형식을 이래 만듬...
  },
  function (error) {
    if (error.response) {
      const { status } = error.response

      if (status == 401) {
        removeAccessToken()
        return Promise.reject(new UnAuthorizationError())
      }

      if (status >= 400 && status < 500) {
        return Promise.reject(new ClientError())
      }

      if (status >= 500) {
        return Promise.reject(new ServerError())
      }
    } else {
      // 네트워크 오류 또는 서버가 응답하지 않는 경우
      console.error('Network Error:', error.message)
    }

    return Promise.reject(error)
  },
)
