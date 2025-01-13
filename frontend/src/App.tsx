import { Route, Routes } from 'react-router'
import { BrowserRouter } from 'react-router'
import { Global } from '@emotion/react'
import globalStyles from './styles/globalStyles.ts'

import { AuthGuard } from './components/auth/AuthGuard.tsx'
import { AlertProvider } from './components/shared/Alert/AlertProvider.tsx'
import { PrivateRoute } from './components/auth/PrivateRoute'
import { HomePage } from './pages/HomePage'
import { SigninPage } from './pages/SigninPage'
import { SignupPage } from './pages/SignupPage'
export const App = () => {
  return (
    <BrowserRouter>
      <Global styles={globalStyles} />
      <AlertProvider>
        <AuthGuard>
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <HomePage />
                </PrivateRoute>
              }
            />
            <Route path="/signin" element={<SigninPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
        </AuthGuard>
      </AlertProvider>
    </BrowserRouter>
  )
}
