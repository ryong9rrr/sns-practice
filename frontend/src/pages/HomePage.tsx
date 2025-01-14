import { Link, useNavigate } from 'react-router'
import { Button } from '../components/shared/Button'
import { useUserStore } from '../stores/users'
import { Text } from '../components/shared/Text'
import { Navigation } from '../components/Navigation'

export const HomePage = () => {
  const navigate = useNavigate()

  const { user, signout } = useUserStore()

  const handleSignout = () => {
    signout()
    navigate('/signin', { replace: true })
  }

  return (
    <>
      <h1>
        <Text>{user?.nickname}님 환영해요!</Text>
        <Button onClick={handleSignout}>로그아웃</Button>
        <Link to="/signin">로그인 페이지로</Link>
        <Link to="/signup">회원가입 페이지로</Link>
      </h1>
      <Navigation />
    </>
  )
}
