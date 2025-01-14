import { Suspense } from 'react'
import styled from '@emotion/styled'
import { useImage } from 'react-image'
import fallbackImage from '../../assets/image-fallback.png'
import { AvatarSize, avatarSizeMap } from '../../styles/avatar'
import { SerializedStyles } from '@emotion/react'

export interface AvatarProps {
  src: string
  size?: AvatarSize

  css?: SerializedStyles
}

export const Avatar = (props: AvatarProps) => {
  return (
    <Suspense fallback={<AvatarSkeleton />}>
      <AvatarImage {...props} />
    </Suspense>
  )
}

const AvatarImage = (props: AvatarProps) => {
  const { src: _src, size, css } = props

  const { src } = useImage({
    srcList: [_src, fallbackImage],
  })

  return (
    <Container size={size} css={css}>
      <Img size={size} src={src} />
    </Container>
  )
}

const AvatarSkeleton = () => {
  return (
    <Container>
      <Img src={fallbackImage} />
    </Container>
  )
}

const Container = styled.div<Pick<AvatarProps, 'size'>>(
  {
    display: 'inline-block',
    overflow: 'hidden',
  },
  ({ size = 'medium' }) => avatarSizeMap[size],
)

const Img = styled.img<Pick<AvatarProps, 'size'>>(({ size = 'medium' }) => avatarSizeMap[size])
