import React, { useCallback, useEffect, useState } from 'react'
import { getMe } from '../../remote/users'
import { User } from '../../models/users'

export const AuthGuard = ({ children }: { children: React.ReactNode | React.ReactNode[] }) => {
  const [isInitialized, setIsInitialized] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  const checkAuth = useCallback(async () => {
    const fetchedUser = await getMe()
    if (fetchedUser) {
      setUser(fetchedUser)
      console.log(user)
    }
    setIsInitialized(true)
  }, [user])

  useEffect(() => {
    checkAuth()
    // eslint-disable-next-line
  }, [])

  if (!isInitialized) {
    return null
  }

  return (
    <>
      <h1>{user ? `${user.nickname}님이 로그인했어요` : '로그인 안됨'}</h1>
      {children}
    </>
  )
}
