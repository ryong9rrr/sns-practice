import { PropsWithChildren, useCallback, useEffect, useState } from 'react'
import { getMe } from '../../remote/users'
import { useUserStore } from '../../stores/users'

export const AuthGuard = ({ children }: PropsWithChildren) => {
  const [isInitialized, setIsInitialized] = useState(false)
  const { user, setUser } = useUserStore()

  const checkAuth = useCallback(async () => {
    const fetchedUser = await getMe()
    if (fetchedUser) {
      setUser(fetchedUser)
    }
    setIsInitialized(true)
  }, [setUser])

  useEffect(() => {
    console.log('AuthGuard useEffect')
    checkAuth()
  }, [checkAuth])

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
