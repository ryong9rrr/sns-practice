import { Suspense } from 'react'
import styled from '@emotion/styled'
import { useImage } from 'react-image'
import { AvatarSize, avatarSizeMap } from './foundations/avatar'
import { Colors } from './foundations/colorPalette'
import fallbackImage from '../../assets/avatar-fallback.png'

export interface AvatarProps {
  size: AvatarSize

  src?: string
  ring?: Colors // TODO...
}

export const Avatar = (props: AvatarProps) => {
  return (
    <Suspense fallback={<AvatarSkeleton size={props.size} />}>
      <AvatarImage {...props} />
    </Suspense>
  )
}

const AvatarImage = (props: AvatarProps) => {
  const { src: _src, size } = props

  const { src } = useImage({
    srcList: _src ? [_src, fallbackImage] : [fallbackImage],
  })

  return (
    <Container size={size}>
      <Img size={size} src={src} />
    </Container>
  )
}

const AvatarSkeleton = (props: Pick<AvatarProps, 'size'>) => {
  return (
    <Container size={props.size}>
      <Img src={fallbackImage} size={props.size} />
    </Container>
  )
}

const Container = styled.div<Pick<AvatarProps, 'size'>>(
  {
    display: 'inline-block',
    overflow: 'hidden',
  },
  ({ size }) => avatarSizeMap[size],
)

const Img = styled.img<Pick<AvatarProps, 'size'>>(({ size }) => avatarSizeMap[size])
