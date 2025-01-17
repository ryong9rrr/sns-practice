import { PropsWithChildren } from 'react'
import { Navigation } from '../../components/Navigation'

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <div css={{ padding: 1 }}>{children}</div>
      <Navigation />
    </div>
  )
}
