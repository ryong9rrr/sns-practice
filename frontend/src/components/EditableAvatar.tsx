import { ChangeEvent, useCallback } from 'react'
import { css, SerializedStyles } from '@emotion/react'
import styled from '@emotion/styled'
import { RiImageCircleFill } from 'react-icons/ri'
import { Avatar, AvatarProps } from './shared/Avatar'
import { AvatarSize, avatarSizeMap } from './shared/foundations/avatar'
import { colors } from './shared/foundations/colorPalette'

interface EditableAvatarProps extends AvatarProps {
  onChangeFile?: (file: File) => void
}

export const EditableAvatar = (props: EditableAvatarProps) => {
  const { onChangeFile, ...rest } = props

  const handleChangeFile = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0]
      if (!selectedFile || !onChangeFile) {
        return
      }
      onChangeFile(selectedFile)
    },
    [onChangeFile],
  )

  return (
    <div css={{ display: 'inline-block', position: 'relative' }}>
      <Label htmlFor="file-input" size={props.size}>
        <Avatar {...rest} />
        <RiImageCircleFill css={editIconStyles(props.size)} />
      </Label>
      <input
        id="file-input"
        type="file"
        accept="image/*"
        css={{ display: 'none' }}
        onChange={handleChangeFile}
      />
    </div>
  )
}

const Label = styled.label<Pick<AvatarProps, 'size'>>(
  {
    display: 'inline-block',
    overflow: 'hidden',
    cursor: 'pointer',
  },
  ({ size }) => avatarSizeMap[size],
)

const avatarBadgeSizeMap: Record<AvatarSize, SerializedStyles> = {
  xsmall: css`
    font-size: 8px;
    padding: 1px;
  `,
  small: css`
    font-size: 10px;
    padding: 1px;
  `,
  medium: css`
    font-size: 14px;
    padding: 1px;
  `,
  large: css`
    font-size: 16px;
    padding: 2px;
  `,
  xlarge: css`
    font-size: 18px;
    padding: 2px;
  `,
  '2xlarge': css`
    font-size: 20px;
    padding: 2px;
  `,
  '3xlarge': css`
    width: 24px;
    height: 24px;
    padding: 2px;
  `,
  '4xlarge': css`
    width: 28px;
    height: 28px;
    padding: 2px;
  `,
  '5xlarge': css`
    width: 32px;
    height: 32px;
    padding: 2px;
  `,
}

const editIconStyles = (size: AvatarSize) => css`
  ${avatarBadgeSizeMap[size]}

  position: absolute;
  bottom: 0;
  right: 0;
  background-color: ${colors.white};
  border-radius: 50%;
  color: ${colors.blue};
  cursor: pointer;
`
