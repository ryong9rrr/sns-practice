import { Route, Routes } from 'react-router'
import { HomePage } from './Home'
import { SignupPage } from './Signup'

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  )
}
