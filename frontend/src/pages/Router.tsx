import { Route, Routes } from 'react-router'
import { HomePage } from './Home'
import { SignupPage } from './Signup'
import { SigninPage } from './Signin'

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signin" element={<SigninPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  )
}
