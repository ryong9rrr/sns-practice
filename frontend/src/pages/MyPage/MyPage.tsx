import { useCallback } from 'react'
import { Navigation } from '../../components/Navigation'
import { useUserStore } from '../../stores/users'
import { EditableAvatar } from '../../components/EditableAvatar'

export const MyPage = () => {
  const { user } = useUserStore()

  const handleChangeAvatar = useCallback((file) => {
    console.log(file)
  }, [])

  return (
    <>
      <EditableAvatar size="5xlarge" onChangeFile={handleChangeAvatar} />
      {user?.nickname}
      {/* <Flex>
        <UserImage />
        <div style={{ flex: 1 }}>게시물</div>
      </Flex>
      <div>{user?.nickname}</div>
      <Navigation /> */}
      <Navigation />
    </>
  )
}
