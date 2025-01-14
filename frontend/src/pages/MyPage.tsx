import styled from '@emotion/styled'
import { Navigation } from '../components/Navigation'
import { Flex } from '../components/shared/Flex'
import { useUserStore } from '../stores/users'
import { css } from '@emotion/react'
import { ChangeEvent, CSSProperties, useCallback } from 'react'
import { RiImageCircleFill } from 'react-icons/ri'
import { colors } from '../styles/colorPalette'
import { Avatar } from '../components/shared/Avatar'

export const MyPage = () => {
  const { user } = useUserStore()

  return (
    <>
      <UserProfileImage />
      <Avatar src="https://bit.ly/broken-link" />

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

const UserProfileImage = (props: { isEditable?: boolean }) => {
  const { isEditable = false } = props

  const onFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) {
      return
    }
    console.log(selectedFile)
  }, [])

  return (
    <div css={{ display: 'inline-block', position: 'relative' }}>
      <label htmlFor={isEditable ? 'file-input' : ''} css={labelStyles}>
        <img src="https://cdn-icons-png.flaticon.com/128/847/847969.png" css={imageStyles} />
        {isEditable && <RiImageCircleFill css={editIconStyles} />}
      </label>
      {isEditable && (
        <input
          id="file-input"
          type="file"
          accept="image/*"
          css={{ display: 'none' }}
          onChange={onFileChange}
        />
      )}
    </div>
  )
}

const labelStyles = css`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: inline-block;
  overflow: hidden;
`

const imageStyles = css`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  //cursor: pointer;
`

const editIconStyles = css`
  font-size: 24px;
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: ${colors.white};
  padding: 4px;
  border-radius: 50%;
  color: ${colors.blue};
  //cursor: pointer;
`

const EditableUserProfileImage = () => {}
