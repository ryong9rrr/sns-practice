import { createPortal } from 'react-dom'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'
import { colors } from '../../styles/colorPalette'
import { Button, ButtonProps } from './Button'

interface FixedBottomButtonProps extends ButtonProps {
  label: string
}

export const FixedBottomButton = (props: FixedBottomButtonProps) => {
  const { label, ...buttonProps } = props
  const $portalRoot = document.getElementById('root-portal')

  if (!$portalRoot) {
    return null
  }

  return createPortal(
    <Container>
      <Button
        {...buttonProps}
        size="medium"
        full
        css={{
          borderRadius: 8,
        }}
      >
        {label}
      </Button>
    </Container>,
    $portalRoot,
  )
}

const slideup = keyframes`
  to {
    transform: translateY(0);
  }
`

const Container = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${colors.white};
  padding: 20px 10px 8px;
  transform: translateY(100%);
  animation: ${slideup} 0.5s ease-in-out forwards;
`
