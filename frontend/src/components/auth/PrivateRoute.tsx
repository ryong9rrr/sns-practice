import { PropsWithChildren } from 'react'
import { Navigate } from 'react-router'
import { useUserStore } from '../../stores/users'

export const PrivateRoute = ({ children }: PropsWithChildren) => {
  const { user } = useUserStore()

  if (!user) {
    return <Navigate to="/signin" replace={true} />
  }

  return <>{children}</>
}
