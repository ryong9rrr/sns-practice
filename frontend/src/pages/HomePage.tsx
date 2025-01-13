import { Link } from 'react-router'

export const HomePage = () => {
  return (
    <h1>
      <Link to="/signin">로그인 페이지로</Link>
      <Link to="/signup">회원가입 페이지로</Link>
    </h1>
  )
}