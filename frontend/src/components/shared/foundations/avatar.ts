import { css } from '@emotion/react'

export const avatarSizeMap = {
  xsmall: css`
    width: 16px;
    height: 16px;
    border-radius: 50%;
  `,
  small: css`
    width: 24px;
    height: 24px;
    border-radius: 50%;
  `,
  medium: css`
    width: 32px;
    height: 32px;
    border-radius: 50%;
  `,
  large: css`
    width: 40px;
    height: 40px;
    border-radius: 50%;
  `,
  xlarge: css`
    width: 48px;
    height: 48px;
    border-radius: 50%;
  `,
  '2xlarge': css`
    width: 56px;
    height: 56px;
    border-radius: 50%;
  `,
  '3xlarge': css`
    width: 64px;
    height: 64px;
    border-radius: 50%;
  `,
  '4xlarge': css`
    width: 72px;
    height: 72px;
    border-radius: 50%;
  `,
  '5xlarge': css`
    width: 80px;
    height: 80px;
    border-radius: 50%;
  `,
}

export type AvatarSize = keyof typeof avatarSizeMap
