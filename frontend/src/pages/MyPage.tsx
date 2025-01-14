import { Navigation } from '../components/Navigation'
import { useUserStore } from '../stores/users'
import { Avatar } from '../components/shared/Avatar'
import { EditableAvatar } from '../components/EditableAvatar'

export const MyPage = () => {
  const { user } = useUserStore()

  return (
    <>
      <EditableAvatar size="xsmall" />
      <EditableAvatar size="small" />
      <EditableAvatar size="medium" />
      <EditableAvatar size="large" />
      <EditableAvatar size="2xlarge" />
      <EditableAvatar size="3xlarge" />
      <EditableAvatar size="4xlarge" />
      <EditableAvatar size="5xlarge" />
      <Avatar size="2xlarge" src="https://avatars.githubusercontent.com/u/64957267?v=4" />
      <Avatar size="2xlarge" src="https://avatars.githubusercontent.com/u/64957267?v=4" />
      <Avatar size="5xlarge" src="https://avatars.githubusercontent.com/u/64957267?v=4" />
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
