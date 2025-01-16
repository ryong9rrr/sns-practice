import { Route, Routes } from 'react-router'
import { PrivateRoute } from '../components/auth/PrivateRoute'
import { SigninPage } from './SigninPage'
import { SignupPage } from './SignupPage'
import { HomePage } from './HomePage'
import { MyPage } from './MyPage'
import { SearchPage } from './SearchPage'
import { AddPostPage } from './AddPostPage'

export const Router = () => {
  return (
    <Routes>
      <Route path="/signin" element={<SigninPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }
      />
      <Route
        path="/search"
        element={
          <PrivateRoute>
            <SearchPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/addpost"
        element={
          <PrivateRoute>
            <AddPostPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/my"
        element={
          <PrivateRoute>
            <MyPage />
          </PrivateRoute>
        }
      />
      <Route path="/*" element={<h1>404 Not Found</h1>} />
    </Routes>
  )
}
