import { useCallback, useEffect } from 'react'
import { Navigation } from '../../components/Navigation'
import { useUserStore } from '../../stores/users'
import { EditableAvatar } from '../../components/EditableAvatar'
import { uploadAvatar } from '../../remote/users'
import { useAlert } from '../../components/shared/Alert/useAlert'

export const MyPage = () => {
  const { user, fetchUser } = useUserStore()
  const { alert } = useAlert()

  const handleChangeAvatar = useCallback(
    async (files: FileList) => {
      const form = new FormData()

      ;[...files].forEach((file) => {
        form.append('image', file) // "image"는 서버가 지정한 key
      })

      try {
        await uploadAvatar(form)
        await fetchUser()
      } catch (error) {
        console.error(error)
        alert({
          title: '다시 시도해주세요',
          description: '이미지 파일만 사용 할 수 있어요',
        })
      }
    },
    [fetchUser, alert],
  )

  useEffect(() => {
    console.log('마이페이지 진입-------------')
    console.log(window.history.state)
  }, [])

  return (
    <>
      <EditableAvatar size="5xlarge" onChangeFile={handleChangeAvatar} src={user?.imgUrl} />
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
