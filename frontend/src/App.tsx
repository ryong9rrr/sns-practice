import { BrowserRouter, Route, Routes } from 'react-router'
import { PrivateRoute } from './components/auth/PrivateRoute'
import { HomePage } from './pages/HomePage'
import { SigninPage } from './pages/SigninPage'
import { SignupPage } from './pages/SignupPage'

export const App = () => {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  )
}
