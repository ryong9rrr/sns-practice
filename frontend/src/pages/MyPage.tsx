import { Navigation } from '../components/Navigation'
import { useUserStore } from '../stores/users'

export const MyPage = () => {
  const { user } = useUserStore()

  return (
    <>
      <div>{user?.nickname}님 안녕하세요!</div>
      <Navigation />
    </>
  )
}
