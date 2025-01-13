import { PropsWithChildren, useCallback, useEffect, useState } from 'react'
import { getMe } from '../../remote/users'
import { useUserStore } from '../../stores/users'

export const AuthGuard = ({ children }: PropsWithChildren) => {
  const [isInitialized, setIsInitialized] = useState(false)
  const { setUser } = useUserStore()

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

  return <>{children}</>
}
