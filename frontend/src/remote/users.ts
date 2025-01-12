import { User } from '../models/users'
import { UnAuthorizationError } from './errors'
import { authRequest, request } from './http'

export const getMe = async () => {
  try {
    const { data } = await authRequest.get<User>('/users/my')
    return data
  } catch (error) {
    if (error instanceof UnAuthorizationError) {
      return null
    }
    throw error
  }
}

export const signup = async (props: { email: string; password: string; nickname: string }) => {
  const { email, password, nickname } = props
  const { data } = await request.post<User>('/users/signup', {
    email,
    password,
    nickname,
  })
  return data
}

export const signin = async (props: { email: string; password: string }) => {
  const { email, password } = props
  const { data } = await request.post<{ accessToken: string }>('/users/signin', {
    email,
    password,
  })
  return data
}
