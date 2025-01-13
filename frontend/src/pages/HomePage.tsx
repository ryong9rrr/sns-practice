import { Link, useNavigate } from 'react-router'
import { Button } from '../components/shared/Button'
import { useUserStore } from '../stores/users'

export const HomePage = () => {
  const navigate = useNavigate()

  const { signout } = useUserStore()

  const handleSignout = () => {
    signout()
    navigate('/signin', { replace: true })
  }

  return (
    <h1>
      <Button onClick={handleSignout}>로그아웃</Button>
      <Link to="/signin">로그인 페이지로</Link>
      <Link to="/signup">회원가입 페이지로</Link>
    </h1>
  )
}
