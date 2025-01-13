import { create } from 'zustand'
import { User } from '../models/users'
import * as UserApi from '../remote/users'
import { SigninFormValues } from '../components/sign/SigninForm'
import { removeAccessToken, setAccessToken } from '../components/auth/token'

interface UserStoreInterface {
  user: User | null
  fetchUser: () => Promise<void>
  signin: (formValues: SigninFormValues) => Promise<void>
  signout: () => void
}

export const useUserStore = create<UserStoreInterface>((set, get) => ({
  user: null,
  fetchUser: async () => {
    const fetchedUser = await UserApi.getMe()
    if (fetchedUser) {
      set(() => ({ user: fetchedUser }))
    }
  },
  signin: async (formValues: SigninFormValues) => {
    const { fetchUser } = get()
    const { accessToken } = await UserApi.signin(formValues)
    setAccessToken(accessToken)
    await fetchUser()
  },
  signout: () => {
    removeAccessToken()
    set(() => ({ user: null }))
  },
}))
