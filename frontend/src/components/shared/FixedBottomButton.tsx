import { createPortal } from 'react-dom'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'
import { colors } from '../../styles/colorPalette'
import { Button } from './Button'

interface FixedBottomButtonProps {
  label: string
  onClick: () => void
  disabled?: boolean
}

export const FixedBottomButton = (props: FixedBottomButtonProps) => {
  const { label, onClick, disabled } = props
  const $portalRoot = document.getElementById('root-portal')

  if (!$portalRoot) {
    return null
  }

  return createPortal(
    <Container>
      <Button
        size="medium"
        disabled={disabled}
        onClick={onClick}
        full
        style={{
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
