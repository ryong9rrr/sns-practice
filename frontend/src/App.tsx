import { BrowserRouter } from 'react-router'
import { Global } from '@emotion/react'
import globalStyles from './styles/globalStyles.ts'
import { AuthGuard } from './components/auth/AuthGuard.tsx'
import { AlertProvider } from './components/shared/Alert/AlertProvider.tsx'
import { Router } from './pages/Router.tsx'

export const App = () => {
  return (
    <BrowserRouter>
      <Global styles={globalStyles} />
      <AlertProvider>
        <AuthGuard>
          <Router />
        </AuthGuard>
      </AlertProvider>
    </BrowserRouter>
  )
}
