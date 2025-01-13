import { create } from 'zustand'
import { User } from '../models/users'

interface UserStoreInterface {
  user: User | null
  setUser: (user: User | null) => void
}

export const useUserStore = create<UserStoreInterface>((set) => ({
  user: null,
  setUser: (user: User | null) => {
    set(() => ({ user }))
  },
}))
