import { ButtonHTMLAttributes } from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import {
  ButtonColor,
  buttonColorMap,
  ButtonSize,
  buttonSizeMap,
  buttonWeakMap,
} from './foundations/button'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: ButtonColor
  size?: ButtonSize
  weak?: boolean
  full?: boolean
}

export const Button = styled.button<ButtonProps>(
  {
    cursor: 'pointer',
    fontWeight: 'bold',
    borderRadius: '6px',
  },
  ({ color = 'primary', weak }) => (weak ? buttonWeakMap[color] : buttonColorMap[color]),
  ({ size = 'small' }) => buttonSizeMap[size],
  ({ full }) =>
    full &&
    css`
      display: block;
      width: 100%;
      border-radius: 0;
    `,
  ({ disabled }) =>
    disabled &&
    css`
      opacity: 0.26;
      cursor: initial;
    `,
)
