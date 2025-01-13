import { PropsWithChildren, useCallback, useEffect, useState } from 'react'
import { useUserStore } from '../../stores/users'

export const AuthGuard = ({ children }: PropsWithChildren) => {
  const [isInitialized, setIsInitialized] = useState(false)
  const { fetchUser } = useUserStore()

  // user fetch check
  const checkAuth = useCallback(async () => {
    await fetchUser()
    setIsInitialized(true)
  }, [fetchUser])

  useEffect(() => {
    console.log('AuthGuard useEffect')
    checkAuth()
  }, [checkAuth])

  if (!isInitialized) {
    return null
  }

  return <>{children}</>
}
